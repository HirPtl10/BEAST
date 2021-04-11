const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    guildId: String,
    roleId: String
})
mongoose.model = module.exports('autojoin', Schema)