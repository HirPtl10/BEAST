const { Client, Message, MessageEmbed, Discord } = require('discord.js');
module.exports = {
  name: 'hackban',
  description: 'bans member outside server',
  run: async (client, message, args) => {
    if(!message.member.permissions.has("BAN_MEMBERS")) return;
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply(`I Do not have permission to ban members`);
  const useri = args[0];
	  if(!useri) return message.reply(`Provide A userid`)
    const reason = args.slice(1).join(' ');
     message.reply(`Do You Really want to ban <@${useri}> if yes the type \`yes\``)
    
    const collector = message.channel.awaitMessages(user => user.author.id === message.author.id, { max: 1 }).then((msgs) => {
	   
    if (msgs.first().content.toLowerCase() === 'yes') {
    client.users.fetch(useri).then(async user => {
      await message.guild.members.ban(useri, {reason: reason});
      return message.channel.send(`https://tenor.com/view/discord-ban-server-discord-server-discord-server-ban-gif-18150385\n<@${useri}> has been banned from the server`);
    })
      } else {
 return message.reply(`Cancelles`)
		  }
    })
    
  }
}
