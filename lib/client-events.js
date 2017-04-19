'use strict';

/* This module is the event handler for the bot, client events are passed onto here from bot.js for
reactions to be sorted */

const bootServers = require('./servers/bootServers.js');
const commands = require('./commands/commands.js');
const database = require('./database/database.js');
const directMessages = require('./directMessages.js');
const log = require('./logger.js')(module);

let booted = false;

module.exports = {
    disconnect() {
    },

    message(message) {
        /* Admin section (perform admin tasks first) */

        /* Filtering Section */

        // Ignore bot messages
        if (message.author.bot) { log.silly('Ignored bot message'); return false; }

        // Filter out and handle DMs
        if (message.channel.type === 'dm' || message.channel.type === 'group') {
            return directMessages.execute(message);
        }

        /* Commands Section */

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

    ready(client) {
        // If this is the first ready event, perform boot functions
        if (!booted) {
            bootServers.execute(client);
            database.boot(client);
            booted = true;
        }
    },

    reconnecting() {
    },

    warn() {

    },
};
