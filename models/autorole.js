const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    roleId: String
})
module.exports = mongoose.model('auto', Schema)