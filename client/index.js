const client = require('../index');
const { GiveawayClient } = require('reconlx')
const config = require('../config.json')

const giveaway = new GiveawayClient({
   defaultColor: "00FFF9"
})
module.exports = giveaway;