const Discord = require('discord.js');

module.exports = {
    name: 'slowmode',
    aliases: ['sm'],
    description: 'Changes Slowmode',
    
    run: async (client, message, args) =>{
        

        const embed = new Discord.MessageEmbed()

       if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        
           embed.setDescription('<a:opa5:797429643245387797> You cant use this')
           embed.setColor('e70619')
          
           return message.channel.send(embed)
       } 
       
    
        if(!args[0]) {
            message.channel.setRateLimitPerUser('0')
        } 
        

        

        if(isNaN(parseInt(args[0]))) {
            
            embed.setDescription('<a:opa5:797429643245387797> That Is Not A Number')
            embed.setColor('e70619')
            
            return message.channel.send(embed)
        } 
       

        message.channel.setRateLimitPerUser(args[0])

            
            embed.setDescription(`<a:tick:805054223103426560> __The slowmode of the channel has been set to__ ${args[0]}`)
            embed.setColor('1ace4d')
           

            return message.channel.send(embed)


       
    }
 
}   
