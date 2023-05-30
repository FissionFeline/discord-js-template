const colors = require('colors/safe');

class Logger {
    constructor(origin) {
        this.origin = origin
    }
    info(message) {
        console.log(`${colors.gray((new Date()).toLocaleString())} ${colors.cyan(`[INFO] [${origin}]`)} ${message}`);
    }

    success(message) {
        console.log(`${colors.gray((new Date()).toLocaleString())} ${colors.green(`[SUCCESS] [${origin}]`)} ${message}`);
    }

    warn(message) {
        console.warn(`${colors.gray((new Date()).toLocaleString())} ${colors.yellow(`[WARN] [${origin}]`)} ${message}`);
    }

    error(message) {
        console.error(`${colors.gray((new Date()).toLocaleString())} ${colors.red(`[ERROR] [${origin}]`)} ${message}`);
    }
}

module.exports = Logger;