const { fetchCache, addToCache } = require('../../events/rr')
const RMSchema = require('../../models/message')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'rr',
  run: async (client, message, args) => {
    const { guild } = message

    if (!guild.me.hasPermission('MANAGE_ROLES')) {
      message.reply('The bot requires access to manage roles to work correctly')
      return
    }

    let emoji = args.shift() // 🎮
    let role = args.shift() // Warzone
    const displayName = args.join(' ') // 'Warzone game nights'

    if (role.startsWith('<@&')) {
      role = role.substring(3, role.length - 1)
      console.log(role)
    }

    const newRole =
      guild.roles.cache.find((r) => {
        return r.name === role || r.id === role
      }) || null

    if (!newRole) {
      message.reply(`Could not find a role for "${role}"`)
      return
    }

    role = newRole

    if (emoji.includes(':')) {
      const emojiName = emoji.split(':')[1]
      emoji = guild.emojis.cache.find((e) => {
        return e.name === emojiName
      })
    }

    const [fetchedMessage] = fetchCache(guild.id)
    if (!fetchedMessage) {
      message.reply('An error occurred, please try again')
      return
    }

    const newLine = `${emoji} ${displayName}`
    let { content } = fetchedMessage

    if (content.includes(emoji)) {
      const split = content.split('\n')

      for (let a = 0; a < split.length; ++a) {
        if (split[a].includes(emoji)) {
          split[a] = newLine
        }
      }

      content = split.join('\n')
    } else {
      content += `\n${newLine}`
      fetchedMessage.react(emoji)
    }
console.log(content)
     let desc = fetchedMessage.embeds[0].description || '';
    const embedd = new MessageEmbed(fetchedMessage.embeds[0]).setDescription(desc + `\n` + content)
    fetchedMessage.edit(fetchedMessage.content, embedd)

    const obj = {
      guildId: guild.id,
      channelId: fetchedMessage.channel.id,
      messageId: fetchedMessage.id,
    }

    await RMSchema.findOneAndUpdate(
      obj,
      {
        ...obj,
        $addToSet: {
          roles: {
            emoji,
            roleId: role.id,
          },
        },
      },
      {
        upsert: true,
      }
    )

    addToCache(guild.id, fetchedMessage, emoji, role.id)
  },
}
