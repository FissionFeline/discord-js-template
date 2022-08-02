const fs = require('fs');
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Logger = require('../utils/logger');

class CommandManager {
  constructor() {
    this.rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    this.textCommands = new Collection();
    this.slashCommands = new Collection();
  }

  scanTextCommands() {
    fs.readdirSync('./src/commands/text').filter((file) => file.endsWith('.js')).forEach((file) => {
      const commandName = file.split('.')[0];
      Logger.info(`[Commands] Attempting to load text command ${commandName}`);

      // eslint-disable-next-line import/no-dynamic-require, global-require
      const command = require(`./text/${commandName}`);
      try {
        this.textCommands.set(command.name, command);
        Logger.success(`[Commands] Successfully loaded ${command.name}`);
      } catch (error) {
        Logger.warn(`[Commands] Unable to load text command ${file}:\n${error.stack}\n`);
      }
    });
  }

  scanSlashCommand() {
    fs.readdirSync('./src/commands/slash').filter((file) => file.endsWith('.js')).forEach((file) => {
      const commandName = file.split('.')[0];
      Logger.info(`[Commands] Attempting to load slash command ${commandName}`);

      try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const command = require(`./slash/${commandName}`);
        this.slashCommands.set(command.name, command);
      } catch (error) {
        Logger.warn(`[Commands] Unable to load slash command ${commandName}:\n${error.stack}\n`);
      }
    });
  }

  async registerSlashCommands() {
    try {
      Logger.info(`[REST] Registering ${this.slashCommands.size} slash commands`);
      await this.rest.put(
        Routes.applicationCommands(process.env.APPLICATION_ID),
        { body: this.slashCommands },
      );
      Logger.success('[REST] Successfully registered all commands');
    } catch (error) {
      Logger.error('[REST] Failed to register commands');
    }
  }
}

module.exports = CommandManager;
