const fs = require('fs')
const log = new require('../logger.js')
const logger = new log("Command loader")
const { SlashCommandBuilder } = require('@discordjs/builders');
const path_to_commands = __dirname + '/../../commands/'

module.exports = (client) => {
    const commands = fs.readdirSync(path_to_commands).filter(file => file.endsWith('.js'));

    for (const command of commands) {
        const command_loaded = require(command)
        if(!command_loaded) return logger.error(`${command} not valid`)
        if(command_loaded.execute !== 'function') return logger.error(`${command} does not have the execute function`)
        if(command_loaded.register_command instanceof SlashCommandBuilder == false) return logger.error(`${command} does not have the register_command SlashcommandBuilder instance`)
        
    }

}