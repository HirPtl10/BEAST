const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'pin',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
      message.channel.messages.fetch(args[0])
      .then(message => message.pin())  
   }
}