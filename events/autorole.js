const mongoose = require('mongoose')
const Autorole = require('../commands/admin/autorole')
const client = require('../index')
const auto = require('../models/autorole')

client.on('guildMemberAdd', async (member) => {
    auto.findOne({ guildId: member.guild.id, roleId : Autorole.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            return
            } else {
                await member.roles.add(Autorole.id)
            } 
        })
})
