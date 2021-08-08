const client = require("../index");

client.on('messageReactionAdd', async (reaction, member)=>{
    const role = reaction.guild.roles.cache.get('837518657612546058')
    await member.roles.add(role)
})
