const mongoose = requir('mongoose')

const welcum = new mongoose.Schema({
  guildid: String,
  wlcid: String,
  wlcmsg: Array  
})
module.exports = mongoose.model('wlc', welcum)
