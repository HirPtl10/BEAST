const mongoose = require('mongoose')

module.exports = mongoose.model('inventory', new Schema({
    Guild: String, 
    User: String,
    Inventory: Object
    })
);