const fs = require('fs')
const log = new require('../logger.js')
const logger = new log("Event loader")
const path_to_events = __dirname + '/../../events/'

module.exports = (client) => {
    const events = fs.readdirSync(path_to_events).filter(file => file.endsWith('.js'));

    for (const element of events) {
        const element_loaded = require(path_to_events + element)
        if (!element_loaded.type) { logger.error(`Failed to load ${element} type`);continue}
        if (!element_loaded.call) { logger.error(`Failed to load ${element} call`);continue}
        switch (element_loaded.type) {
            case "on":
                {
                    logger.success(`Successfully loaded ${element} event`)
                    client.on(element_loaded.event, (...args) => element_loaded.call(client,...args));
                    break;
                }
            case "once":
                {
                    logger.success(`Successfully loaded ${element} event`)
                    client.once(element_loaded.event, (...args) => element_loaded.call(client,...args));
                    break;
                }
            default:
                return logger.error(`Type of ${element} is not allowed!`)
        }
    }
    return logger.info("Events loaded")
}