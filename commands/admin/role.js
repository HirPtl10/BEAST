const { Message } = require('discord.js')

module.exports = {
    name : 'role',
    description: 'adds a role',
    run : async(client, message, args) => {
        
         
     
        if(!message.member.hasPermission("MANAGE_ROLES")) return;
        //next we define some variables
        const target  = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        if(!target) return message.channel.send('No member specified') //when no member is pinged
        const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(' ') || r.name === args[1]) || message.guild.roles.cache.find(r => r.id.toLowerCase()=== args.slice(1).join(" ") || r.id === args[1])  // roles = mentions
        if(!role) return message.channel.send('No role specified') //when no role is specified or pinged
        //now the code!
        await target.roles.add(role) // adding the role to the user
        message.channel.send(`Role Added To User`)
        
        
    } 
    
}    


