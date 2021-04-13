const mongoose = require('mongoose')

module.exports = mongoose.module(
  'Money',
  new mongoos.Schema({
    id: String,
    coins: Number,
    
  })
)