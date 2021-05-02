module.exports = {
  name: 'vcmute',
  run: async (client, message, args) => {
    var member = message.mentions.members.first();
   
    member.voice.setMute()
  }
}
