module.exports = {
  name: 'dm',
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    const target = args[0]
    const words = args.slice(1).join(' ')
    client.users.fetch(target).then(async user => {
    target.send(words)
    })
  }
}
