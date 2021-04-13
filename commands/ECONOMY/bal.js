const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'bal',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
       const target = message.author || message.mentions.members.first();
       const bal = await client.bal(target.member.id)
       const embed = new MessageEmbed();
       embed.setTitle(`Balance of ${target.user.tag}`)
       embed.setDescription(bal+ " coins")
       message.channel.send(embed);

   }
}