'use strict';

// This module sets up and eports the logger for the project

/* eslint no-console: 0 */

const chalk = require('chalk');
const config = require('../config/config.js');
const moment = require('moment');

const loggingLevels = {
    error: {
        level: 5,
        color: 'red',
        background: 'bgRed',
    },
    warn: {
        level: 4,
        color: 'yellow',
        background: 'bgYellow',
    },
    info: {
        level: 3,
        color: 'blue',
        background: 'bgBlue',
    },
    verbose: {
        level: 2,
        color: 'cyan',
        background: 'bgCyan',
    },
    debug: {
        level: 1,
        color: 'white',
        background: 'bgBlack',
    },
    silly: {
        level: 0,
        color: 'magenta',
        background: 'bgMagenta',
    },
};

const severity = loggingLevels[config.getConfig().general.logLevel].level;


module.exports = function log(callingModule) {
    const label = getLabel(callingModule);

    return {
        // -- Logging levels --

        error(message) {
            console.trace(constructString('error', label, message));
            process.exit(1);
            return true;
        },

        warn(message) {
            if (loggingLevels.warn.level < severity) { return false; }
            console.log(constructString('warn', label, message));
            return true;
        },

        info(message) {
            if (loggingLevels.info.level < severity) { return false; }
            console.log(constructString('info', label, message));
            return true;
        },

        verbose(message) {
            if (loggingLevels.verbose.level < severity) { return false; }
            console.log(constructString('verbose', label, message));
            return true;
        },

        debug(message) {
            if (loggingLevels.debug.level < severity) { return false; }
            console.log(constructString('debug', label, message));
            return true;
        },

        silly(message) {
            if (loggingLevels.silly.level < severity) { return false; }
            console.log(constructString('silly', label, message));
            return true;
        },
    };
};

function getLabel(callingModule) {
    const parts = callingModule.filename.split('/');
    return `${parts[parts.length - 2]}/${parts.pop()}`;
}

function constructString(type, label, message) {
    return `${chalk[loggingLevels[type].background](type)}` +
        `[${moment().format('MMMM Do, h:mm:ss a')}](${label}) ` +
        `${chalk[loggingLevels[type].color](message)}`;
}
