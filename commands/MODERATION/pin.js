const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'pin',
   description: 'Pins a message',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return;
      message.channel.messages.fetch(args[0])
      .then(message => message.pin())  
   }
}