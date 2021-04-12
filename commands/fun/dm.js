module.exports = {
  name: 'dm',
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR") return;
     
      const words = args.slice(1).join(' ')
      message.mentions.members.first.send(words)
  }
}
