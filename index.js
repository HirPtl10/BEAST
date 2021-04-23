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
client.on("ready", () => {

    console.log(`Done`)
    client.user.setActivity(`F`, {type: 'WATCHING'})
const commands = await getApp(testGuildId).commands.get();

	await getApp(testGuildId).commands.post({
		data: {
			name: 'embed',
			description: 'Create an embed. (Total embed cannot exceed 4,000 characters due to slash command limitations.)',
			options: [
				{
					name: 'Title',
					description: 'Sets thembed title. (256 characters max)',
					required: true,
					type: 3
				},
				{
					name: 'Description',
					description: 'Sets the embed description. (2048 characters max)',
					required: true,
					type: 3
				},
				{
					name: 'Footer',
					description: 'Sets the footer of your embed (2048 characters max)',
					required: false,
					type: 3
				},
				{
					name: 'Color',
					description: 'Sets the embed color. Use the hex-code color value. (e.g. #ffffff)',
					required: false,
					type: 3
				},
				{
					name: 'Thumbnail',
					description: 'Adds an image/gif to the upper-right corner of your embed. (Use a direct media link.)',
					required: false,
					type: 3
				},
				{
					name: 'Image',
					description: 'Adds an image/gif to the bottom of your embed. (Use a direct media link.)',
					required: false,
					type: 3
				}
			]
		}
	})
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
	const { name, options } = interaction.data;
	const slash = name.toLowerCase();

	const args = {};

	const createAPIMessage = async(interaction, content) => {
		const { data, files } = await Discord.APIMessage.create(
			client.channels.resolve(interaction.channel_id),
			content
		)
		.resolveData()
		.resolveFiles()
		return { ...data, files }
	}

	const reply = async (interaction, response) => {
		let data = {
			content: response
		}

		if (typeof response === 'object') {
			data = await createAPIMessage(interaction, response)
		}

		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data,
			}
		})
	};

	if (options) {
		for (const option of options) {
			const { name, value } = option
			args[name] = value
		}
	};

	if (slash === 'embed') {
		const avatar = `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`
		const embed = new Discord.MessageEmbed()
			for (const arg in args) {
				if (arg === 'title') {
					embed.setTitle(args[arg])
				};
				if (arg === 'description') {
					embed.setDescription(args[arg])
				};
				if (arg === 'footer') {
					embed.setFooter(args[arg])
				};
				if (arg === 'color') {
					embed.setColor(`${args[arg]}`)
				};
				if (arg === 'thumbnail') {
					embed.setThumbnail(args[arg])
				};
				if (arg === 'image') {
					embed.setImage(args[arg])
				};

			};
		embed.setAuthor(`${interaction.member.user.username}#${interaction.member.user.discriminator}`, avatar)
		embed.setTimestamp()
			
		reply(interaction, embed)	
	};
});


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





