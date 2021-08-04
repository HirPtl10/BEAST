const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const { post } = require('node-superfetch');


module.exports = {
   name: 'eval',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    if (message.author.id !== '844825143381590016') return;
    const embed = new MessageEmbed()
    .setTitle('Eval')
    .addField("Input", "```js\n" + args.join(" ") + "```")
    try {
      const code = args.join(" ")
      let evaled;
      if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes(`process.env`)) {
        evaled = "Nope"
      } else {
        evaled = eval(code)
      }
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0})
        let output = clean(evaled)
        if (output.length > 1024) {
          const {body} = await post("https://hastebin.com").send(output);
          embed.addField("Output", `https://hastebin.com/${body.key}.js`)
         
        } else {
            embed.addField("Output", "```js\n" + output + "```")
        }
       message.channel.send(embed)
      } catch(error) {

      }

    }
  }
 function clean(string) {
   if (typeof text === "string") {
     return message.reply(/` /g, "`" + String.fromCharCode(8203))
     .replace(/@/g, "@" + String.fromCharCode(8203))
   } else {
     return string;
   }
 }
