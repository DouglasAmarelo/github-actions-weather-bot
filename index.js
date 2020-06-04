require('dotenv').config();

const fetch = require('node-fetch');
const Telegram = require('node-telegram-bot-api');
const bot = new Telegram(process.env.TELEGRAM_TOKEN);

const weatherToken = process.env.WHEATHER_TOKEN_API;

const weatherURL = new URL(`https://api.openweathermap.org/data/2.5/weather`);
weatherURL.searchParams.set('q', 'São Paulo');
weatherURL.searchParams.set('APPID', weatherToken);
weatherURL.searchParams.set('units', 'metric');
weatherURL.searchParams.set('lang', 'pt_br');

const getWeatherData = async () => {
  const response = await fetch(weatherURL.toString());
  const data = await response.json();

  return data;
};

const generateWeatherMessage = ({
  name,
  weather: [{ description }],
  main: { temp, temp_min, temp_max },
}) => `O tempo em ${name}: ${description}.\nA temperatura atual é de ${temp}, com mínima de ${temp_min} e máxima de ${temp_max}
`;

const main = async () => {
  const weatherData = await getWeatherData();
  const weatherMessage = generateWeatherMessage(weatherData);

  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherMessage);
};

main();
