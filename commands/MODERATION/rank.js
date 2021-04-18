const canvacord = require('canvacord')
const Levels = require('discord-xp')
const {MessageAttachment} = require('discord.js')
module.exports = {
    name: 'rank',
    run: async(client, message, args) => {
        const userData = await Levels.fetch(message.author.id, message.guild.id)
        const requiredXP = Levels.xpFor(parseInt(userData.level) + 1)
        const rank = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({format: "png", size: 1024}))
        .setProgressBar("#77e4ee", "COLOR")
        .setBackground("IMAGE", "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/07/shutterstock_582803470.jpg?w=750")
        .setCurrentXP(userData.xp)
        .setLevel(userData.level)
        .setRequiredXP(requiredXP)
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
        const img = await rank.build()
        message.channel.send(new MessageAttachment(img, "RankCard.png"))
    }
}
