const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const mongoose = require('mongoose')
const schema = require('../../models/schema')
module.exports = {
   name: 'daily',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    client.add(message.author, parseInt('2000'))
    message.channel.send(`Done`)
   }
}