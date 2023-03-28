const colors = require('colors/safe');

class Logger {
    static info(message) {
        console.log(`${colors.gray((new Date()).toLocaleString())} ${colors.cyan('[INFO]')} ${message}`);
    }

    static success(message) {
        console.log(`${colors.gray((new Date()).toLocaleString())} ${colors.green('[SUCCESS]')} ${message}`);
    }

    static warn(message) {
        console.warn(`${colors.gray((new Date()).toLocaleString())} ${colors.yellow('[WARN]')} ${message}`);
    }

    static error(message) {
        console.error(`${colors.gray((new Date()).toLocaleString())} ${colors.red('[ERROR]')} ${message}`);
    }
}

module.exports = Logger;