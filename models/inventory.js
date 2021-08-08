const mongoose = require('mongoose')

module.exports = mongoose.model('inventory', new mongoose.Schema({
    Guild: String,
    User: String,
    Inventory: Object,
    })
);