'use strict';

/* This module is the event handler for the bot, client events are passed onto here for reactions to
be sorted */

const commands = require('./commands/commands.js');
const log = require('./logger.js')(module);

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

        // Ignore message if the message does not contain a valid command
        const cmd = commands.filter(message);
        if (!cmd) {
            log.silly('Ignored message without valid command');
            return false;
        }

        // Message contained a valid command, execute it
        commands[cmd](message);
        return true;
    },

    ready() {
    },

    reconnecting() {
    },

    warn(warning) {
        console.log(warning);
    },
};
