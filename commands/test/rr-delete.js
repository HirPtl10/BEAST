const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const Schema = require('../../models/prefix')
module.exports = {
   name: 'rr-delete',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return;
    await Schema.findOneAndDelete({ Guild: message.guild.id })
    message.channel.send(`Deleted Data`)
   }
}