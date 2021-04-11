const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    guildId: String,
    roleId: String
})
module.exports = mongoose.model('auto', Schema)