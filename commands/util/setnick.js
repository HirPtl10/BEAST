

module.exports = {
  name: "setnick",
  description: "changes nickname",

  run: async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`You can not use this`)
    const member = message.mentions.members.first();

    if (!member) return message.reply("Please specify a member!");

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply("Please specify a nickname!");

      member.setNickname(arguments) 

  }
}
