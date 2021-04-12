const client = require('../index')
const { antijoin } = require('../Collection/index')

client.on("guildMemberAdd", async (member) => {
  const getCollection = antijoin.get(member.guild.id)
  if (!getCollection) return;
  if (!getCollection.includes(member.user)) {
     getCollection.push(member.user);
  }
  member.kick({ reason: "Antijoin mode was enabled in the guild" })
})

