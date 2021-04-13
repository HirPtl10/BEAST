const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'add',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.author;

        client.add(member.id, parseInt(args[0]));
        message.channel.send(`Added bal`)
   }
}