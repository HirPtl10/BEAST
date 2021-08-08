const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const mongoose = require('mongoose')
const auto = require('../../models/autorole')


module.exports = {
   name: 'autorole',
   description: 'Join role',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
        const Autorole = message.mentions.roles.first();

        const data = await auto.findOne({ guildId: message.guild.id })
        const newData = new auto({
            guildId: message.guild.id,
            roleId: Autorole.id,
        })
        await newData.save();
        message.channel.send(`Autorole updated to ${Autorole}`)
        
    } 
}