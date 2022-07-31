const fs = require('node:fs');
const Logger = require('../utils/logger');

class EventManager {
  constructor(client) {
    this.client = client;
    this.events = [];
  }

  registerEvents() {
    fs.readdirSync('./events/events').filter((file) => file.endsWith('.js')).forEach((file) => {
      const eventName = file.split('.')[0];
      Logger.info(`[Events] Attempting to load event ${eventName}`);

      try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const event = require(`./events/${eventName}`);
        this.client.on(eventName, event.bind(null, this.client));
        Logger.success(`[Events] Successfully loaded ${eventName}`);
      } catch (error) {
        Logger.warn(`[Events] Unable to load event ${file}:\n${error.stack}\n`);
      }
    });
  }
}

module.exports = EventManager;
