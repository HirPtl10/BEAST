const ytsr = require('ytsr')
const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'youtube',
   description: 'youtube command',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    const query = args.join(' ')
    if (!query) return message.channel.send('Provide a search')
    const res = await ytsr(query).catch(e => {
        return message.channel.send(`No resultes found`)
        const video = res.listen.filter(i => i.type === "video")[0];
        const embed = new Discord.MessageEmbed();
        embed.setTitle(video.title)
        embed.setImage(video.thumbnail)
        message.channel.send(embed)
    })
   }
}