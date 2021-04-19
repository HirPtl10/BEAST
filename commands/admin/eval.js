const { Client, MessageEmbed, Discord } = require('discord.js')

const { inspect } = require('util')

module.exports = {
  name: 'eval',
  run: async (client, message, args) => {
  if (message.author.id !=== '827793921144913971') return;
    const code = args.join(' ')
    try {
      const result = await eval(code);
      let outpout = result;
      if (typeof result !== 'string') {
        output = inspect(result)
      }
      message.channel.send(output, {code: 'js'})
    } catch (error) {
      console.log(error)
      message.channel.send(`Its too long`)
    }
  }
}
