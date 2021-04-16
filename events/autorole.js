const mongoose = require('mongoose')
const client = require('../index')
const data = require('../models/autorole')
const roleId = require('../models/autorole')

client.on('guildMemberAdd', async (member) => {
    data.findOne({ guildId: member.guild.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            return
            } else {
                await member.roles.add(roleId)
            } 
        })
})
