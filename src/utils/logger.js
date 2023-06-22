const colors = require('colors/safe');

class Logger {
    constructor(origin) {
        this.origin = origin
    }
    info(message) {
        console.log(`${colors.gray((new Date()).toLocaleString())} ${colors.cyan(`[${this.origin}] [INFO]`)} ${message}`);
    }

    success(message) {
        console.log(`${colors.gray((new Date()).toLocaleString())} ${colors.green(`[${this.origin}] [SUCCESS]`)} ${message}`);
    }

    warn(message) {
        console.warn(`${colors.gray((new Date()).toLocaleString())} ${colors.yellow(`[${this.origin}] [WARN]`)} ${message}`);
    }

    error(message) {
        console.error(`${colors.gray((new Date()).toLocaleString())} ${colors.red(`[${this.origin}] [ERROR]`)} ${message}`);
    }
}

module.exports = Logger;