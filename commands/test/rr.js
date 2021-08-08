const { Client, Message, MessageEmbed, Util } = require('discord.js')
const Schema = require('../../models/reaction-roles')
module.exports = {
    name: 'rr',


    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;
        const role = message.mentions.roles.first();

    

        let [, emoji] = args;
        if (!emoji) return message.channel.send("No emoji provided!");

        const parsedEmoji = Util.parseEmoji(emoji);

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
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
            message.channel.send('Role Added');
        });
    }
}
