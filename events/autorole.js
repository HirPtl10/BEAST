const mongoose = require('mongoose')
const Autorole = require('../commands/admin/autorole')
const client = require('../index')
const Schema = require('../models/autorole')

client.on('guildMemberAdd', async (member) => {
    Schema.findOne({ guildId: member.guild.id, roleId : Autorole.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            return
            } else {
                member.roles.add(Autorole)
            }
        })
})
