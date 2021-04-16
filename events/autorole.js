const mongoose = require('mongoose')
const client = require('../index')
const auto = require('../models/autorole')
const roleId = require('../models/autorole')

client.on('guildMemberAdd', async (member) => {
    auto.findOne({ guildId: member.guild.id }, async(err, data) => {
        if(err) throw err;
        if(!auto) {
            return;
            } else {
                await member.roles.add(roleId)
            } 
        })
})
