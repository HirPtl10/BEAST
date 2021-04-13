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
        client.add(target.id, parseInt(args[1]));
        message.channel.send(`Added money on ${target} balance`)
   }
}