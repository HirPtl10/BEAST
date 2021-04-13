const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'bal',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
       const member = message.mentions.members.first() || message.author;
       const bal = await client.bal(message.member.id)
       message.channel.send(bal + " coins");

   }
}