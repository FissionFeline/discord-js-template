require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const CommandManager = require('./commands/commandManager');

const fuckIntents = new Discord.Intents(32767);
const Logger = require('./utils/logger');

const client = new Discord.Client({ intents: fuckIntents });
const commandManager = new CommandManager();

commandManager.scanSlashCommand();
commandManager.scanTextCommands();

client.once('ready', async () => {
  await commandManager.registerSlashCommands();
  Logger.success(`[Discord] Connected! You're in as ${client.user.username}`);
  client.user.setActivity('Something creative');
});

const events = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));
for (const file of events) {
  Logger.info(`[Events] Attempting to load ${file}`);
  const eventName = file.split('.')[0];
  const event = require(`./events/${file}`);
  try {
    client.on(eventName, event.bind(null, client));
    Logger.success(`[Events] Successfully loaded ${eventName}`);
  } catch (error) {
    Logger.warn(`[Events] Unable to load ${file}`);
    console.error(error);
  }
}


process.on('uncaughtException', (error) => {
  Logger.error('[Process] Uncaught exception:');
  console.error(error);
  process.exit(1);
});

client.login(process.env.TOKEN);
