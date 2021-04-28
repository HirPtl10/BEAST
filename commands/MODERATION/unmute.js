const Discord = require('discord.js')
const Guild = require('../../models/guild')

module.exports = {

    name : 'unmute',
    
    description: 'unmutes a member',
    
    run : async (client, message, args) => {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!message.member.hasPermission('MANAGE_ROLES')) return;
const guildDB = await Guild.findOne({
    guildID: message.guild.id
}, async (err, guild) => {
    if (err) console.error(err);
    
    if (!guild) {
        const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: process.env.PREFIX,
            logChannelID: null
        });

        await newGuild.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));
    };
});

const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);
        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
        
        const reason = args[1] || "No reason provided"

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} is now unmuted\nReason:- ${reason}`)
        if(!logChannel) {
            return;

        } else {
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Unmute Case`)
            .addField(`Member`, Member, true)
            .addField(`Reason`, reason, true)
            .addField(`Moderator`, message.author, true)
        }
    }
}
