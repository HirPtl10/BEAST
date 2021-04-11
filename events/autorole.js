const mongoose = require('mongoose')
const Autorole = require('../commands/admin/autorole')
const client = require('../index')
const db = require('../models/autorole')

client.on('guildMemberAdd', async (member) => {
    db.findOne({ roleId : Autorole.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            return
            } else {
                member.roles.add(Autorole)
            }
        })
})
