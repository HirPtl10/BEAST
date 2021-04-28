
const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const mongoose = require('mongoose');

module.exports = {
    name: 'modlogs',
    description: 'Sets the channel that moderation actions will be logged in',
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_GUILD')) return;

        const channel = await message.mentions.channels.first();

        if (!channel)
            return message.channel.send('I cannot find that channel. Please mention a channel within this server.').then(m => m.delete({timeout: 5000}));

        await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    
                    logChannelID: channel.id
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(`The modlogs channel has been set to ${channel}`);
            } else {
                guild.updateOne({
                    logChannelID: channel.id
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(`The modlogs channel has been set to ${channel}`);
            };
        });
    }
}
