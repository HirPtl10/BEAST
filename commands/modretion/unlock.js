const Discord = require('discord.js');


module.exports = {
   name: "unlock",
   description: "Unlocks a Channel",
   run: async(client, message, args) => {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) {
   return message.channel.send("You don't have enough Permissions")
   }
  
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        allow : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   
   .setDescription(`🔓 ${message.channel} has been Unocked By ${message.author}`)
   .setColor("GREEN");
   await message.channel.send(embed);
   message.delete();
}
}