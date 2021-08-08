
const Discord = require("discord.js");
const ms = require("ms");
const Guild = require('../../models/guild')

module.exports = {
    name: 'mute',
    description: 'TempMute Command',
    run: async (client, message, args) => {

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_ROLES")) return message.reply("Can't mute them!");
  const guildDB = await Guild.findOne({
    guildID: message.guild.id
}, async (err, guild) => {
    if (err) console.error(err);
    
    if (!guild) {
        const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: process.env.PREFIX,
            logChannelID: null
        });

        await newGuild.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));
    };
});

const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);
  let muterole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!muterole) {
            try {
                message.channel.send('Muted role is not found, attempting to create muted role.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Muted role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
    
  let mutetime = args[1];
  const reason = args.slice(2).join(' ');
  if(!mutetime) return message.reply("You didn't specify a time!");
let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
  await(tomute.roles.add(role2));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
  
  if (!logChannel) {
      return
  } else {
      const embed = new Discord.MessageEmbed();
     embed.setTitle('Mute Case')
     .addField(`Member`, tomute, true)
     .addField(`Duration`, mutetime, true)
     .addField(`Moderator`, message.author, true)
     .addField(`Reason`, reason, true)
    return logChannel.send(embed)
  }


  setTimeout(function(){
    tomute.roles.remove(role2);
    if (!logChannel) {
        return
    } else {
        const embed = new Discord.MessageEmbed();
       embed.setTitle('Unmute Case')
       .addField(`Member`, tomute, true)
       .addField(`Reason`, `Auto`, true)
       .addField(`Muted By`, message.author, true)
      return logChannel.send(embed)
    }
  
  }, ms(mutetime));

    }
}
