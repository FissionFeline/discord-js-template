const fs = require('fs')
const log = new require('../logger.js')
const logger = new log("Command loader")
const path_to_commands = __dirname + '/../../commands/'

module.exports = (client) => {
    const commands = fs.readdirSync(path_to_commands).filter(file => file.endsWith('.js'));

    for (const command of commands) {
        
    }

}