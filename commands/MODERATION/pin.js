const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'pin',
   description: 'Pins a message',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
       const messageId = args[0]
    const message = message.channel.messages.fetch(messageId)
    .then(message => message.pin())
   }
}