const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "kiss",
    description: "pweatty user gives kisses to you <3",
    run: async (client, message, args) => {
        
        const member = message.mentions.members.first();
        const messages = [
            `https://tenor.com/view/anime-kiss-love-sweet-gif-5095865`,
            `https://tenor.com/view/cute-kawai-kiss-anime-gif-16371489`,
            `https://tenor.com/view/golden-time-anime-kiss-couple-lovers-gif-6155670`,
            `https://tenor.com/view/anime-kiss-kisses-love-like-gif-5604562`,
            `https://tenor.com/view/kiss-anime-love-gif-9158317`,
            `https://tenor.com/view/kiss-me-%D0%BB%D1%8E%D0%B1%D0%BB%D1%8E-anime-kiss-intimate-gif-17382422`,
            `https://tenor.com/view/kiss-cute-anime-blush-gif-18075897`,
            `https://tenor.com/view/anime-kiss-making-out-kissing-gif-13658106`,
            `https://cdn.weeb.sh/images/HJlWhpdw-.gif`
        ]
        var randomMessages = messages[Math.floor(Math.random() * messages.length)];
        
            let embed = new MessageEmbed()
            embed.setColor("RANDOM")
            embed.setAuthor(`${message.author.username} kissed ${member.username}`)
            embed.setImage(randomMessages);
            message.channel.send(embed);
      
    }
}
