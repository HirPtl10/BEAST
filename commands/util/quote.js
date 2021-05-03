const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord")
module.exports = {
    name: 'quote',
    
    run: async(client, message, args) => {
        let user = message.mentions.users.first();
        if(!user) return message.channel.send("Please mention a user!")

        let text = args.slice(1).join(" ")
        if(!text) return message.channel.send("Please provide a text!")

        let color = '#0000FF'

        const userAvatar = user.displayAvatarURL({ dynamic: false, format: "png" })

        const img = await Canvas.quote({ image: userAvatar, message: text, username: user.username, color: color })

        let attachemnt = new MessageAttachment(img, "quote.png")
        message.channel.send(attachemnt)
    }
}