const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'pin',
   description: 'Pins a message',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    const msg = message.channel.messages.fetch(args[0])
    msg.pin();
   }
}