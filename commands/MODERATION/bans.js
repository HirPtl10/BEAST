const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bans',
    description : 'Shws banned users in server',
    aliases: ["banlist"],
    
    run: async(client, message, args) => {
  if(!message.member.permissions.has("BAN_MEMBERS")) return;
  
  if(!message.guild.me.permissions.has("BAN_MEMBERS")) {
    return message.reply("I am not having \`BAN_MEMBERS\` permission")
  }
  

        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans)
        .map ((member) => member.user.tag)
        .join("\n");
        const embed = new MessageEmbed()
        .setTitle("Ban List")
        .setDescription(bannedMembers)
        .setColor("FF0000")
        .setTimestamp()

        message.channel.send(embed);
    },

};
