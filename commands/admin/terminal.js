const { Client, MessageEmbed, Discord } = require('discord.js')
const child = require('child_process');

module.exports = {
  name: 'terminal',
  run: async (client, message, args) => {
        if (message.author.id !== '827793921144913971') return;
          const command = args.join(' ')
          child.exec(command, (err, res) => {
            if (err) return console.log(err
                message.channel.send(res.slice(0, 2000), { code: "js" })
          }) 
  }
}
