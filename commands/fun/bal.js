const ProfileModels = require('../../models/profileSchema')
const mongoose = require('mongoose')

const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'bal',
   description: 'shos balance of a user',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    const target = message.mentions.members.first() || message.author;
    await ProfileModels.findOne({
        userId: target.id,
        serverId: message.guild.id,
        coins: 1000
    })
    message.channel.send(`Balance is ${tagret.coins}` || `Balance is 0`)
   }
}