const { Client, Message, MessageEmbed, Discord, MessageAttachment } = require('discord.js');
const Meme = require('memer-api')
const memer = new Meme();
module.exports = {
   name: 'tweet',
   description: 'Tweet a fun command',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    const user1 = message.member;

    const avatar = user1.user.displayAvatarURL({ dynamic: false })

    const text = args.join(' ');

    if (!text) return message.reply(`Please provide a text.`);

    const username = user1.user.username;

    memer.tweet(avatar, username, text).then(image => {
        const attachment = new MessageAttachment(image, "tweet.png")
        message.channel.send(attachment)
    })
   }
}