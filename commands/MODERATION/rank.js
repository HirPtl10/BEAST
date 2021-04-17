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
        .setProgressBar("#F81818", "COLOR")
        .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/832275504483926076/832984710124798012/5f11ee82cc416782f9ac6ff8f42d6360-1200-80.jpg")
        .setCurrentXP(userData.xp)
        .setLevel(userData.level)
        .setRequiredXP(requiredXP)
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
        const img = await rank.build()
        message.channel.send(new MessageAttachment(img, "RankCard.png"))
    }
}
