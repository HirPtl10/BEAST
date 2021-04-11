
module.exports = {
  name: "embed",
  description: 'Json embed',
  run: async (client, message, args) => {
    // get the target channel
    const targetChannel = message.mentions.channels.first()
    if (!targetChannel) {
      message.reply('Please specify a channel to send the embed in')
      return
    }

    // removes the channel mention
    args.shift()

    try {
      // get the JSON data
      const json = JSON.parse(args.join(' '))
      const { text = '' } = json

      // send the embed
      targetChannel.send(text, {
        embed: json,
      })
    } catch (error) {
      message.reply(`Invalid JSON ${error.message}`)
    }
  },
}
