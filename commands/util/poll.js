const Discord = require('discord.js');


module.exports = {
  
  name: 'poll',
  description: 'poll command',
  
  run: async (client, message, args) => {

        const embed = new Discord.MessageEmbed()

        const Tosend = message.mentions.channels.first()

        const content = args.slice(1).join(' ');

        embed.setTitle(`NEW POLL MADE BY ${message.author.username}`);

        embed.setDescription(content)

        embed.setColor('RANDOM')

        embed.setFooter('Poll')

        embed.setThumbnail(message.author.displayAvatarURL ({ size: 4096, dynamic: true }))

        embed.setTimestamp()

        embed.setThumbnail(message.author.displayAvatarURL)

        let MessageEmbed = await Tosend.send(embed);

        MessageEmbed.react('👍');

        MessageEmbed.react('👎');

        message.delete()
  }
}   