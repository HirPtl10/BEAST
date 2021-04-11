const { Discord, Client, MessageEmbed } = require('discord.js') 
module.exports = {
  
  name: 'serverlist',
  description: 'List of servers',
  async run(client, message, args) {
   let serverlist = ''
        client.guilds.cache.forEach((guild) => {
            serverlist = serverlist.concat( "** - **" + guild.name + "| ID: " + guild.id + `| Members:`+ guild.memberCount + "\n"  )
        })
    
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Servers that have  Bot`, '')
        .setDescription(serverlist)
        message.channel.send({embed});
  }
}
