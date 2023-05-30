const colors = require('colors/safe');

class Logger {
    constructor(origin) {
        this.origin = origin
    }
    info(message) {
        console.log(`${colors.gray((new Date()).toLocaleString())} ${colors.cyan(`[INFO] [${this.origin}]`)} ${message}`);
    }

    success(message) {
        console.log(`${colors.gray((new Date()).toLocaleString())} ${colors.green(`[SUCCESS] [${this.origin}]`)} ${message}`);
    }

    warn(message) {
        console.warn(`${colors.gray((new Date()).toLocaleString())} ${colors.yellow(`[WARN] [${this.origin}]`)} ${message}`);
    }

    error(message) {
        console.error(`${colors.gray((new Date()).toLocaleString())} ${colors.red(`[ERROR] [${this.origin}]`)} ${message}`);
    }
}

module.exports = Logger;