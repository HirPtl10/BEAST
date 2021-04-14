const { Client, Message, MessageEmbed, Discord, Util } = require('discord.js');
const Schema = require('../../models/reaction-roles')

module.exports = {
    name: 'panel',
    description: '',
    aliases: '',
    usage: '',
    timeout: '',
    cooldown: '',
    run: async (client, message, args) => {
        if (!message.member.hasPermission("BAN_MEMBERS")) return;
        const channel = message.mentions.channels.first() || message.channel;
        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (!data) return message.reply(`No data is here`)
            const mapped = Object.keys(data.Roles)
                .map((value, index) => {
                    const role = message.guild.roles.cache.get(
                        data.Roles[value][0]
                    );
                    return `${index + 1}) ${data.Roles[value][1].raw
                        } - ${role}`;
                })
                .join("\n\n")
            channel
                .send(new MessageEmbed().setDescription(mapped))
                .then((msg) => {

                })
        })
    },
}