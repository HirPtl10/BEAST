const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'roleinfo',
   description: 'show info about role',
   aliases: 'ri',
   usage: 'roleinfo @Administrator',
   timeout: '3000',
   cooldown: '3',
   run: async (client, message, args) => {
    const roleId = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(0).join(' ') || r.name === args[0]) || message.guild.roles.cache.find(r => r.id.toLowerCase()=== args.slice(0).join(" ") || r.id === args[0])  // roles = mentions
        const embed = new MessageEmbed();

        embed.setTitle('RoleInfo');
       embed.setDescription(`**Role Name**:- ${roleId.name}\n**RoleId**:- ${roleId.id}\n**RoleMentionable**:- ${role.mentionable.toString().replace("true","Yes")}`)
        embed.setColor(roleId.color)
        message.channel.send(embed)
    } 
}
