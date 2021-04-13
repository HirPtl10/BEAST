const profileModels = require("../models/profileSchema");
module.exports = {
  name: "beg",
  aliases: [],
  permissions: [],
  description: "beg for coins",
  run: async (client, message, args) => {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const response = await profileModels.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: randomNumber,
        },
      }
    );
    return message.channel.send(`${message.author.username}, you begged and received ${randomNumber} **coins**`);
  },
};