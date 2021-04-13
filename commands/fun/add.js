const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'add',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    const target = message.mentions.members.first()
        if (!target) message.reply(`Please mention a person`)
        client.add(target.id, parseInt(args[0]));
        message.channel.send(`Added ${(args[0])} on ${tagret} balance`)
   }
}