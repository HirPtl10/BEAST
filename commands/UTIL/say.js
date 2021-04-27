
const {WebhookClient} = require('discord.js')
module.exports = {
    name: 'say',
run: async (client, message, args)  {

  if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return message.reply('Looks like i\'m missing the `Manage Webhooks` permission!')
        if (!args[0]) return message.reply('please provide a message to send')
    
 else {
 message.channel.createWebhook("hahahah", {
     avatar: "https://cdn.discordapp.com/avatars/827805755486240818/09eaebbed8b99cdec734220afa69d4cd.webp?size=4096"
 }).then(webhook => {
     webhook.send(args.join(' '))
     setTimeout(() => {
         webhook.delete()        
     }, 3000)
  })
 }
    }
}