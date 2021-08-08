module.exports = {
  name: 'vcmute',
  run: async (client, message, args) => {
    var member = message.mentions.members.first();
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    if (!member) return message.inlineReply('No member found')
    if (!member.voice) return message.inlineReply('That member has not joined voice chat yet')
    member.voice.setMute(true)
  }
}
