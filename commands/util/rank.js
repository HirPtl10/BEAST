const {MessageEmbed} = require('discord.js')
const Levels = require('../../index')
module.exports = {
   name: 'rank',
   description: 'shows rank or user',
   aliases: '["r"]',
   usage: 'rank @user',
   timeout: '5000',
   cooldown: '5sec',
   
   run: async (client, message, args) => {


        const user = await Levels.fetch(message.author.id, message.guild.id);
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
 
        const rank = new Discord.MessageEmbed();
        embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        embed.addField("XP", user.xp, true)
        embed.addField("Level", user.level, true)
        embed.addField("Xp Needed For Next Level", neededXp)
        embed.setColor('RED')
       
  message.channel.send(rank)

      }
   }