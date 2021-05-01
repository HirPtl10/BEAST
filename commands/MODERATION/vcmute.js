module.exports = {
  name: 'vcmute',
  run: async (client, message, args) => {
    var member = message.mentions.members.first();
    var reason = args.slice(1).join(' ')
    member.setMute(reason)
  }
}
