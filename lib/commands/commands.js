'use strict';

// Master module for all command
const log = require('../logger.js')(module);
const pingMod = require('./ping.js');
const prefixMod = require('./prefix.js');

module.exports = {
    // A complete list of all valid commands
    commandsList: [
        'ping',
    ],

    // This function will be called to determine what command if any a message contains
    filter: function filter(message) {
        const cmd = message.content.toLowerCase().substring(1);
        for (let i = 0; i < this.commandsList.length; i += 1) {
            if (cmd.startsWith(this.commandsList[i])) {
                log.silly(`Found matching command: ${this.commandsList[i]}`);
                return this.commandsList[i];
            }
        }
        return false;
    },

    ping: function ping(message) {
        pingMod.execute(message);
    },

    // Call prefix module to determine if message contains a valid command prefix
    prefix: function prefix(message) {
        return prefixMod.execute(message);
    },
};
