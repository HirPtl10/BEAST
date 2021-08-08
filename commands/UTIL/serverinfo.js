const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Gives serverinfo',
    run: async (client, message, args) => {




        if (message.author.bot || !message.guild) return message.reply("this command for server only")
        var EMBED = new Discord.MessageEmbed()


            .setTitle("Server Info")

            .addFields(
                { name: '**Server Name**', value: `__${message.guild.name}__`, inline: true },

                { name: '**Server Owner**', value: `__${message.guild.owner}__`, inline: true },

                { name: '**Member Count**', value: `__${message.guild.memberCount}__` },

                { name: '**Total No. Of Roles**', value: `__${message.guild.roles.cache.size}__` },

                { name: '**Total No. Of Channels**', value: `__${message.guild.channels.cache.filter(r => r.type === "text").size} Text__ \n __ ${message.guild.channels.cache.filter(r => r.type === "voice").size} Voice__` },

                { name: '**Server Region**', value: `__${message.guild.region}__`, inline: true },

                { name: '**Created On**', value: `__${message.guild.createdAt.toLocaleString()}__`, inline: true },

                { name: '**System Message Channel**', value: `<#${message.guild.systemChannelid}>`, },

            )

            .setFooter(`${message.author.username}`)

            .setThumbnail(message.guild.iconURL({ dynamic: true }))

            .setColor('df2390')

            .setTimestamp()


        message.channel.send(EMBED)
    }
}
