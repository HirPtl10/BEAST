const Discord = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    Description: 'shows weather',

    run: async(client, message, args)=> {

        const embed = new Discord.MessageEmbed()

        args.shift() 
        const search = args.join(' ')
        
       await weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){

        

        if(error) return message.channel.send(error);

        
  if(!args[0]) {
      embed.setDescription('Enter A location');
      embed.setColor('RANDOM')
      return message.channel.send(embed);
  }     


        if(result === undefined || result.length === 0) {
            embed.setDescription('<a:opa5:797429643245387797> Invalid Location Pleace Enter A Valid Location')
            embed.setColor('RANDOM')

            return message.channel.send(embed);
        }

        var current = result[0].current;
        var location = result[0].location;

        
        embed.setDescription(`**${current.skytext}**`)
        embed.setAuthor(`Weather forecast for ${current.observationpoint}`)
        embed.setThumbnail(current.imageUrl)
        embed.setColor(0x111111)
        embed.addField('Timezone', `UTC${location.timezone}`, true)
        embed.addField('Degree Type', 'Celsius', true)
        embed.addField('Temperature', `${current.temperature}°`, true)
        embed.addField('Wind', current.winddisplay, true)
        embed.addField('Feels like', `${current.feelslike}°`, true)
        embed.addField('Humidity', `${current.humidity}%`, true)


        message.channel.send(embed);
        })        

    }
}