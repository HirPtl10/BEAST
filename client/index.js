const client = require('../index');
const { GiveawayClient } = require('reconlx')
const config = require('../config.json')

const giveaway = new GiveawayClient({
   defaultColor: "00FFF9",
   mongoURI: "mongodb+srv://last:last@test.8ukwy.mongodb.net/Data"
})
module.exports = giveaway;