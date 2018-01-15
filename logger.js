var winston = require('winston');
require('winston-daily-rotate-file');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};

var transport = new (winston.transports.DailyRotateFile)({
    filename: 'logs/./log',
    datePattern: 'dd-MM-yyyy.',
    prepend: true,
    json: false,
    level: process.env.ENV === 'development' ? 'debug' : 'info',
    timestamp: function() {
        var date = new Date();
        return date.toISOString();
    }
});

class Logger {
    constructor() {
        this.transports = transport;
        this.transports.formstter = function(options) {
            return options.timestamp() +'  - ['+ options.level +'] : '+ options.message;
        };
        this.logger = new (winston.Logger)({
            levels: levels,
            transports: [this.transports]
        });
    };
};

module.exports = Logger;