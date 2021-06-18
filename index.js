const { Collection, Client, Discord, Intents, MessageEmbed } = require('discord.js');    
      

const fs = require('fs')
const {readdirSync} = require('fs')
const ms = require('ms')
const Levels = require('discord-xp')
const schema = require('./models/schema')
const db = require("quick.db");

const config = require('./config.json')
const prefix = config.prefix
const prefixSchema = require('./models/prefix')

const client = new Client({
	disableEveryone: true,
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES']
});


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


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://last:last@test.8ukwy.mongodb.net/Data', { useNewUrlParser: true, useUnifiedTopology: true, })
      
const { Player } = require('discord-player');

const player = new Player(client);
client.player = player;

// function
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

client.commands = new Collection();
client.cachedMessageReactions = new Map();
client.db = require("quick.db");
module.exports = client

client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client)
})


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
})      


const distube = require('distube')
const player = new distube(client)
player.on('playSong', (message, queue, song) => {
	message.channel.send(`${song.name} Started playing ok?`)
})
client.player = player; 

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

client.on('channelCreate', async(channel)=>{
    require('./Logging/ChannelCreate')
})
client.on("message", async message => {
  function Check(str) {
    if (
      client.emojis.cache.find(emoji => emoji.name === str) ||
      message.guild.emojis.cache.find(emoji => emoji.name === str)
    ) {
      return true;
    } else {
      return false;
    }
  }
  if (message.content.startsWith(":") && message.content.endsWith(":")) {
    let EmojiName = message.content.slice(1, -1);

    if (Check(EmojiName) === true) {
      const channel = client.channels.cache.get(message.channel.id);
      try {
        let webhooks = await channel.fetchWebhooks();
        let webhook = webhooks.first();
        if (webhook === undefined || null || !webhook) {
          let Created = channel
            .createWebhook("</PRO>", {
              avatar:
                "https://images-ext-1.discordapp.net/external/pFQrvHZTYv3arOtzRxPKrcc6ZupgblRjHcVfBB344OM/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/827805755486240818/09eaebbed8b99cdec734220afa69d4cd.webp"
            })
            .then(async webhook => {
              const emoji =
                client.emojis.cache.find(e => e.name == EmojiName).id ||
                message.guild.emojis.cache.find(e => e.name === EmojiName).id;

              await webhook.send(`${client.emojis.cache.get(emoji)}`, {
                username: message.author.username,
                avatarURL: message.author.avatarURL({ dynamic: true })
              });
              message.delete();
            });
        }

        const emoji =
          client.emojis.cache.find(e => e.name == EmojiName).id ||
          message.guild.emojis.cache.find(e => e.name === EmojiName).id;

        await webhook.send(`${client.emojis.cache.get(emoji)}`, {
          username: message.author.username,
          avatarURL: message.author.avatarURL({ dynamic: true })
        });
        message.delete();
      } catch (error) {
        console.log(`Error :\n${error}`);
      }
    }
  }
});

const { antijoin } = require('./Collection/index');

client.on("guildMemberAdd", async (member) => {
  const getCollection = antijoin.get(member.guild.id)
  if (!getCollection) return;
  if (!getCollection.includes(member.user)) {
     getCollection.push(member.user);
  }
   member.kick({ reason: "Antijoin mode was enabled in the guild" })
})


const Schema = require('./models/reaction-roles');

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  

  Schema.findOne({ Message: reaction.message.id }, async (err, data) => {
    if (!data) return;
    if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

    const [roleid] = data.Roles[reaction.emoji.name];
    reaction.message.guild.members.cache.get(user.id).roles.add(roleid);
    user.send(`You have obtained ${roleid} role`);
  });
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();


  Schema.findOne({ Message: reaction.message.id }, async (err, data) => {
    if (!data) return;
    if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

    const [roleid] = data.Roles[reaction.emoji.name];
    reaction.message.guild.members.cache.get(user.id).roles.remove(roleid);
    user.send(`You have lost ${roleid} role`);
  });
});



