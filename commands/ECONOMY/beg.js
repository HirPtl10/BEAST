const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'beg',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    client.add(message.author.id, parseInt(randomNumber));
    const embed = new MessageEmbed();
   embed.setTitle(`Lol You begged`)
   embed.setDescription(`You begged And earned \`${randomNumber}\``)
   message.channel.send(embed)
   }
}