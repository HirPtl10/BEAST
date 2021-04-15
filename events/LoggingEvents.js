const client = require('..')


client.on('messageDelete', async(message) => {
    require('../Logging/MessageDelete')(message)
})
client.on('messageUpdate', async(oldMessage, newMessage) => {
    require('../Logging/MessageEdit')(oldMessage, newMessage)
})
client.on('roleCreate', async (role) => {
require('../Logging/RoleCreate')(role)
})
client.on('memberRoleUpdate', async (member, role)=>{
require('../Logging/memberUpdate')(member, role)
})

client.on('guildBanAdd', async (user, guild)=>{
require('../Logging/Ban')(user, guild)
})
client.on('guildMemberAdd', async (member)=>{
    require('../Logging/guildMemberAdd')(member)
})

