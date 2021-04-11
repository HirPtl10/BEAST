module.exports = {
  name: "resetnick",
  description: 'resetes a nickname of a member',
 
  run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`You can not use this`)

    const member = message.mentions.members.first();

    if (!member) return message.reply("Please specify a member!");

      member.setNickname(null);
  }
}
