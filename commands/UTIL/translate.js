const translate = require('@vitalets/google-translate-api');
const Discord = require('discord.js');
let langs = {
    "auto": "Automatic",
    "hi": "Hindi",
    "ar": "Arabe",
    "ho": "Holandes",
    "in": "Inglês",
    "en": "Inglês",
    "fr": "Frances",
    "al": "Alemão",
    "el": "Grego",
    "it": "Italiano",
    "ja": "Japones",
    "jw": "Javanes",
    "kn": "Kannada",
    "ko": "Coreano",
    "pt": "Portugues",
    "ro": "Romano",
    "ru": "Russo",
    "es": "Espanhol"
}
 exports.run = (client, message, args) => {
 
  if (!args[0]) {
    return message.channel.send(`Please enter some args.`)
  }
 
  let msg = args.slice(2).join(' ');
  translate(msg, { from: args[0], to: args[1] }).then(res => {
     let embed = new Discord.MessageEmbed()
      .setTitle(`Google Tradutor`)
      .setColor('BLUE')
      .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png')
      .setDescription(`Translation: ` + "`" + `${langs[args[0]]}` + "`" + " para " + "`" + `${langs[args[1]]}` + "`")
      .addField('Texto original:', msg)
      .addField(`Texto traduzido:`, res.text)   
      .setTimestamp()
 
    message.channel.send(embed)
 
 
  }).catch(err => {
    message.channel.send('Error')
  })
};  