'use strict';

/* This module is the event handler for the bot, client events are passed onto here for reactions to
be sorted */

const commands = require('./commands/commands.js');
const database = require('./database/database.js');
const log = require('./logger.js')(module);

let booted = false;

module.exports = {
    disconnect() {
    },

    message(message) {
        /* Admin section (perform admin tasks first) */

        /* Command section */

        // Ignore bot messages
        if (message.author.bot) { log.silly('Ignored bot message'); return false; }

        // Ignore message if there is not a valid command prefix
        if (!commands.prefix(message)) {
            log.silly('Ignored message without command prefix');
            return false;
        }

        // Pass message to be checked for a valid command, if so execute
        const cmd = commands.filter(message);
        if (!cmd) {
            log.silly('Ignored message without valid command');
            return false;
        }
        return commands.commandCall(cmd, message);
    },

    ready() {
        // If this is the first ready event, perform boot functions
        if (!booted) {
            database.boot();
            booted = true;
        }
    },

    reconnecting() {
    },

    warn(warning) {
        console.log(warning);
    },
};
