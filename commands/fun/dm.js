module.exports = {
  name: 'dm',
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR") return;
        const target = message.mentions.members.first();
      const words = args.slice(1).join(' ')
      message.mentions.members.first.send(words)
  }
}
