const Discord = require('discord.js')
const pagination = require('discord.js-pagination');

module.exports = {
    name: 'help',
    description: 'Help command of DJ PRO',
    run: async (client, message, args)=> {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.author.send('You can\'t use this command u need manage message perm to use this')
    const page1 = new Discord.MessageEmbed()

    .setTitle('Administrator Commands')
    .setDescription('**All admin commands are given bellow with their usage**')
    .setColor('36393f')
    .addField(`*dlch`, `Deletes a channel in which command runs` )
    .addField(`*cr`, `Creates a role *cr <color> <role name> \n eg:- *cr RED Role Name` )
    .addField(`*lock`, `Locks a channel in which command runs` )
    .addField(`*unlock`, `Unlocks a channel in which command runs` )
    .addField(`*slowmode`, `Sets slowmode in channel \n *slowmode <number of seconds of slowmode>` )
    .addField(`*modlogs`, `Sets logging in a channel \n *modlogs <#channel>` )
    .addField(`*role`, `Assigns a user a role \n *role <@user> <role>` )


    const page2 = new Discord.MessageEmbed()
    .setTitle('MODERATION COMMANDS')
    .setDescription('**All modretion commands are given bellow with their usage**')
    .setColor('36393f')
    .addField(`*ban`, `Bans a member \n *ban <member> <reason>` )
    .addField(`*kick`, `Kick a member from server \n *kick <member> <reason>` )
    .addField(`*warn`, `Warns a member \n *warn <member> <reason>` )
    .addField(`*mute`, `Unlocks a channel in which command runs` )
    .addField(`*unmute`, `Mute a member \n *mute <member> <time> <reason> time = s, m, h, d` )
    .addField(`*clear`, `Clears messages \n *clear <number of messages to b deleted between 1 & 100>` )
    .addField(`*setnick`, `Changes Nickname of a member \n *setnick <member> <new name>` )

    const page3 = new Discord.MessageEmbed()
    .setTitle('UTILITY COMMANDS')
    .setDescription('**All utility commands are given bellow with their usage**')
    .setColor('36393f')
    .addField(`*whois`, `Shows info of a user *whois <member> or *whois` )
    .addField(`*avatar`, `Shows avatar of e member *avatar <member> or *avatar` )
    .addField(`*serverinfo`, `Shows info about the server` )
    .addField(`*poll`, `Poll command \n *poll <channel> <message> For eg:- *poll #general Which command is best?` )
    .addField(`*weather`, `Shows a weather of a specific place \n *weather <place name> For eg:- *weather London` )
    .addField(`*ticket`, `Opens a ticket \n 🔒 React to deny send message & ⛔ to delete the ticket`)



    const pages = [
        page1,
        page2,
        page3
    ]

    const emoji = ["⏪", "⏩"]

    const timeout = '60000'

    pagination(message, pages, emoji, timeout)
    }
}
