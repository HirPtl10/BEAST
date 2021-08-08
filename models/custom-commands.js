const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   Guild: String,
   Command: String,
   Response: String
})
module.exports = mongoose.model('custom-commands', schema) 