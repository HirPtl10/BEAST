const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const Schema = require('../../models/reaction-roles')

module.exports = {
   name: 'rr',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return;
    const role = message.mentions.roles.first();

    let [, emoji] = args;

    if (!emoji) return message.channel.send('Please specify a emoji')

    const parsedEmoji = Util.parsedEmoji(emoji);
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) {
            data.Roles[parsedEmoji.name] = [
                role.id,
                {
                    id: parsedEmoji.id,
                }
            ]
            await Schema.findOneAndUpdate({ Guild: message.guild.id }, data);
        } else {
            new Schema({
                Guild: message.guild.id,
                Message: 0,
                Roles: {
                    [parsedEmoji.name]: [
                        role.id,
                        {
                            id: parsedEmoji.id,
                            raw: emoji,
                        },
                    ],
                },
            }).save();
        }
        message.channel.send(`new role added`)
    });
   },
};