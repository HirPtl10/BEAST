
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');
const p = require('../../index')

module.exports = {
    name: 'ban',
    description: 'Bans A Member From The Server',
    usage: `${p}@member reason`,
    permissions: 'BAN MEMBERS',
    run: async (client, message, args) => {
        message.delete();

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

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

        if (!message.member.hasPermission('BAN_MEMBERS')) return;

        if (!member)
            return message.channel.send('I cannot find the specified member. Please mention a member in this Discord server.').then(m => m.delete({timeout: 5000}));

        if (!member.kickable)
            return message.channel.send('This member is not bannable.').then(m => m.delete({timeout: 5000}));

        if (message.member.roles.highest.position < member.roles.highest.position)
            return message.channel.send('You cannot ban someone with a higher role than you.').then(m => m.delete({timeout: 5000}));

        User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);

            if (!user) {
                const newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: member.id,
                    muteCount: 0,
                    warnCount: 0,
                    kickCount: 0,
                    banCount: 1
                });

                await newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            } else {
                user.updateOne({
                    banCount: user.banCount + 1
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        let reason = 'No reason specified';

        if (args.length > 1) reason = args.slice(1).join(' ');

        member.send(`👢You were Banned from **${message.guild.name}** \n**Reason**: ${reason}.`);
        member.ban(reason);
        message.channel.send(`${member} was **Banned**! Reason ${reason}`);
        if (!logChannel) {
            return
        } else {
            const embed = new MessageEmbed()
                .setColor(15158332)
                .setTitle('User Banned')
                .setThumbnail(member.user.avatarURL())
                .addField('Username', member.user.username)
                .addField('User ID', member.id)
                .addField('Banned by', message.author)
                .addField('Reason', reason);

            return logChannel.send(embed);
        };
    }
};
