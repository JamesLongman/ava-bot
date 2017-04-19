'use strict';

// This module sets up and eports the logger for the project

const config = require('../config/config.js');
const winston = require('winston');

/*
Default logging levels
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
*/

module.exports = function log(callingModule) {
    return new winston.Logger({
        transports: [new winston.transports.Console({
            colorize: true,
            handleExceptions: true,
            humanReadableUnhandledException: true,
            label: getLabel(callingModule),
            level: config.getConfig().general.logLevel,
            timestamp: true,
        })],
        colors: {
            silly: 'magenta',
            debug: 'white',
            verbose: 'grey',
            info: 'cyan',
            warn: 'yellow',
            error: 'red',
        },
    });
};

function getLabel(callingModule) {
    const parts = callingModule.filename.split('/');
    return `${parts[parts.length - 2]}/${parts.pop()}`;
}
