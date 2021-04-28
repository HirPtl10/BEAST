module.exports = {
  name: 'unban',
  description: 'unbans a member from a server',
  run: async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return;
  const useri = args[0];
    const reason = args.slice(1).join(' ');
    
    client.users.fetch(useri).then(async user => {
      await message.guild.members.unban(useri, {reason: reason});
      return message.channel.send(`<@${useri}> has been unbanned from the server`);
    }).catch(() => {
      return message.channel.send(`No user called **${useri}** found provide a userid`)
    })
    
  }
}
