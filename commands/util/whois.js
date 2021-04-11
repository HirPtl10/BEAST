const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'whois',
  description: 'whois command userinfo command',
  run: async (client, message, args) => { 
    let userArray = message.content.split(" "); 
    let userArgs = userArray.slice(1);
    let member = args[0]


    client.users.fetch(member).then(async user => {

    if (member.presence.status === 'dnd') member.presence.status = '<:DND:818327321735200799> Do Not Disturb';
    if (member.presence.status === 'online') member.presence.status = '<:Online:818329141614215208> Online';
    if (member.presence.status === 'idle') member.presence.status = '<:Idle:818326901713797180> Idle';
    if (member.presence.status === 'offline') member.presence.status = '<:Offline:818326966658662420> Offline';

    let x = Date.now() - member.createdAt;
    let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
    const joined = Math.floor(y / 86400000);

    const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
    let status = member.presence.status;

    const userEmbed = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setTimestamp()
    .setColor('36393f')
    .setThumbnail(member.user.displayAvatarURL({ size: 4096, dynamic: true }))
    .addField("Username", member.user.username, true)
    .addField("Member ID", member.id, true)
    .addField('Roles', `<@&${member._roles.join('> <@&')}>` || 'None') 
    .addField("Account Created On:", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
    .addField('Joined the server At', `${joineddate}, ${joined} day(S) Ago`, true)
    .addField("Status", status)
    .setFooter(`Requested By ${message.author.username}`)
    message.channel.send(userEmbed);
    })
  }
}
