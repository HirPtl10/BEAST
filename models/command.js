
const mongoose = require('mongoose');

let Schema = mongoose.Schema({
   
    GuildId: String,
    Cmds: Array
    
});

module.exports = mongoose.model('cmds', Schema);
