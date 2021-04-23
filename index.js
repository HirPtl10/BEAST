const { Collection, Client, Discord, Intents  } = require('discord.js');
const fs = require('fs')
const ms = require('ms')
const Levels = require('discord-xp')
const schema = require('./models/schema')
const config = require('./config.json')

const client = new Client({
	disableMentions: 'everyone',
	partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBERS', 'REACTION'],
    ws: {
        intents: [
            'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILDS'
        ]

    }
});
module.exports = client;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://last:last@test.8ukwy.mongodb.net/Data', { useNewUrlParser: true, useUnifiedTopology: true, })

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.token });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();


// functions
client.bal = (id) => new Promise(async  ful => {
    const data = await schema.findOne({ id })
    if (!data) return ful(0);
    ful(data.coins)
})
client.add = (id, coins) => {
    schema.findOne({ id }, async (err, data)=> {
        if(err) throw err;
        if (data) {
            data.coins += coins;
        } else {
            data = new schema ({ id, coins })
        }
        data.save();
    })
}
client.rmv = (id, coins) => {
    schema.findOne({ id }, async (err, data)=> {
        if(err) throw err;
        if (data) {
            data.coins -= coins;
        } else {
            data = new schema ({ id, coins: -coins })
        }
        data.save();
    })
}

const Timeout = new Collection();
const prefix = config.prefix
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
})
client.commands = new Collection();
client.cachedMessageReactions = new Map();
client.db = require("quick.db");
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client)
})

	
const prefixSchema = require('./models/prefix')

client.prefix = async function(message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild : message.guild.id })
            .catch(err => console.log(err))
        
        if(data) {
            custom = data.Prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }

const blacklist = require('./models/blacklist')
client.on('message', async message =>{

	const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '827805755486240818') return message.channel.send(`Prefix in ${message.guild.name} is ${p}`)
    }
    if(message.author.bot) return;

    if(!message.content.startsWith(p)) return;
	 blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const randomXp = Math.floor(Math.random() * 6) + 1; //Random amont of XP until the number you want + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You leveled up to ${user.level}! Keep it going!`);
    }	    
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if(command.timeout) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.reply(`Wait for moment You are on cooldown`)
            command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.timeout)
        } else {
          command.run(client, message, args)
        } 
    }
	} else {
	  message.channel.send('You are blacklisted')
	}
    	
  })
})

client.on('guildDelete', async (guild) => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
  
  
const schema = require('./models/custom-commands')
const name = require('./commands/ADMIN/')
const data = await schema.findOne({ Guild: message.guild.id, Command: name })
	if (data) return message.channel.send(data.Response)
 
})



client.on("ready", async () => {

    console.log(`Done`)
    client.user.setActivity(`F`, {type: 'WATCHING'})

const commandFiles = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./slashcommands/${file}`);
        client.api.applications(client.user.id).commands.post({ data: {
            name: command.name,
            description: command.description,
            options: command.commandOptions
        }})
        if (command.global == true) {
            client.api.applications(client.user.id).commands.post({ data: {
                name: command.name,
                description: command.description,
                options: command.commandOptions
            }})
        }
        client.commands.set(command.name, command);
        console.log(`Command POST : ${command.name} from ${file} (${command.global ? "global" : "guild"})`)
    }
    console.log("")
    
    let cmdArrGlobal = await client.api.applications(client.user.id).commands.get()
    let cmdArrGuild = await client.api.applications(client.user.id).commands.get()
    cmdArrGlobal.forEach(element => {
        console.log("Global command loaded : " + element.name + " (" + element.id + ")" )
    });
    console.log("")
    cmdArrGuild.forEach(element => {
        console.log("Guild command loaded : " + element.name + " (" + element.id + ")")
    });
    console.log("")
});
const args = interaction.data.options;
client.ws.on('INTERACTION_CREATE', async interaction => {

    if (!client.commands.has(interaction.data.name)) return;

    try {
        client.commands.get(interaction.data.name).run: async(client, interaction, args);
    } catch (error) {
        console.log(`Error from command ${interaction.data.name} : ${error.message}`);
        console.log(`${error.stack}\n`)
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
					content: `Sorry, there was an error executing that command!`
				}
			}
		})
    }
    
})

client.login(process.env.token)

client.on('messageDelete', async(message) => {
    require('./Logging/MessageDelete')(message)
})
client.on('messageUpdate', async(oldMessage, newMessage) => {
    require('./Logging/MessageEdit')(oldMessage, newMessage)
})
client.on('roleCreate', async (role) => {
require('./Logging/RoleCreate')(role)
})
client.on('memberRoleUpdate', async (member, role)=>{
require('./Logging/memberUpdate')(member, role)
})

client.on('guildBanAdd', async (user, guild)=>{
require('./Logging/Ban')(user, guild)
})
client.on('guildMemberAdd', async (member)=>{
    require('./Logging/guildMemberAdd')(member)
})







