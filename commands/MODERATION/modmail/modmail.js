const client = require('../../../index')
const Discord = require('discord.js')
client.on("message", (message, async) =>{
    if (message.channel.type === 'dm') {
    const channel = '817317526806462475';
    const mod = message.content;
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}s`, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle('Modmail')
    .setDescription(mod)
    .setColor('RED')
    .setTimestamp()
    .addField('Sent by', message.author.tag, false)
    .addField ('User ID', message.author.id, false);
     message.channel.send('Thank you. Your message has been submitted.')
     message.channel.send('Thank you. Your message has been submitted.')
    channel.send(embed);
     }
    })
    client.on('message', (message, args, async) =>{
        const t = `-`
        if (!args[0]) return message.reply(`Invalid use \n reply <member> <message>`);
        if (!args[1]) return message.reply(`Invalid use \n reply <member> <message>`);
        const member = message.mentions.users.first()
        if (!member) member = message.guild.members.cache.get(args[0]);
        const args = message.content.slice(t.length).trim().split(' ');
        const mail = args.slice(1).join(' ');
        if (!member) return message.reply('member not found lol');
        await member.send(`You received a reply to your modmail. \n *${mail}*`)
        message.channel.send(`Successfully replied to ${member}.`);
        })