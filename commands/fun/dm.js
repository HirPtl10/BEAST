module.exports = {
  name: 'dm',
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
     
      const words = args.slice(1).join(' ')
      target.send(words)
  }
}
