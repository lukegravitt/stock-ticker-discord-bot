require('dotenv').config();
const Discord = require('discord.js');
const yahooFinance = require('yahoo-finance');

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

bot.on('ready', () => {
  bot.user.setPresence({
    activity: {
      name: `for '!price SMYB'`,
      type: 'WATCHING',
    },
  });
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async (msg) => {
  if (msg.content.startsWith('!price')) {
    const args = msg.content.substr(7);
    try {
      const result = await yahooFinance.quote(args, ['price']);
      console.log(result);
      if (result.price) {
        msg.channel.send(`Current price for ${result.price.shortName} (${result.price.symbol}): ${result.price.currencySymbol}${result.price.regularMarketPrice}`);
      }
    }
    catch {
      msg.channel.send(`Error retrieving price for ${args}`);
    }
  }

});
