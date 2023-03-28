const fs = require('fs')
const path_to_events = __dirname + '/../../events/'

module.exports = (client) => {
    const events = fs.readdirSync(path_to_events).filter(file => file.endsWith('.js'));

    for (const element of events) {
        const element_loaded = require(path_to_events + element)
        if (!element_loaded.type) return console.log(`Failed to load ${element} type`)
        if (!element_loaded.call) return console.log(`Failed to load ${element} call`)
        switch (element_loaded.type) {
            case "on":
                {
                    client.on(element_loaded.event, (...args) => element_loaded.call(...args));
                    break;
                }
            case "once":
                {
                    client.once(element_loaded.event, (...args) => element_loaded.call(...args));
                    break;
                }
            default:
                return console.log(`Type of ${element} is not allowed!`)
        }
    }

}