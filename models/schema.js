const mongoose = require('mongoose')

module.exports = mongoose.module(
  'Money',
  new mongoose.Schema({
    id: String,
    coins: Number,

  })
)