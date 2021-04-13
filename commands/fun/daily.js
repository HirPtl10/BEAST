const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const mongoose = require('mongoose')
const schema = require('../../models/schema')
module.exports = {
   name: 'daily',
   description: '',
   aliases: '',
   usage: '',
   timeout: '171936000',
   cooldown: '1Day',
   run: async (client, message, args) => {
    const amount = 2000;
    client.add(message.author.id, parseInt(amount))
    message.channel.send(`Done`)
   }
}