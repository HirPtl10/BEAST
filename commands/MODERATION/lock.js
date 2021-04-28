const Discord = require('discord.js');


module.exports = {
   name: "lock",
   description: "Locks a Channel",
   aliases: ['close', 'fucck'],
   run: async(client, message, args) => {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
  
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   
   .setDescription(`🔐 ${message.channel} has been Locked By ${message.author}`)
   .setColor("GREEN");
   await message.channel.send(embed);
   message.delete();
}
}
