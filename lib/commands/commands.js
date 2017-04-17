'use strict';

// Master module for all bot commands

// General requirements
const log = require('../logger.js')(module);
const prefixMod = require('./prefix.js');

// Command modules
const commandsMod = require('./commandModules/core/commands.js');
const helpMod = require('./commandModules/core/help.js');
const pingMod = require('./commandModules/bot/ping.js');

module.exports = {
    // Used to execute any given command
    commandCall: function filter(command, message) {
        if (commandFunctions[command]) {
            commandFunctions[command](message);
            return true;
        }
        return false;
    },

    // A complete list of all valid commands
    commandsList: [
        'commands',
        'help',
        'ping',
    ],

    /* This function will be called to determine what command if any a message contains if a valid
    command was called it will return the command to be called */
    filter: function filter(message) {
        const cmd = message.content.toLowerCase().substring(1);
        for (let i = 0; i < this.commandsList.length; i += 1) {
            if (cmd.startsWith(this.commandsList[i])) {
                log.silly(`Found matching command: ${this.commandsList[i]}`);
                // Valid command, so return the command to be called
                return this.commandsList[i];
            }
        }
        return false;
    },

    // Call prefix module to determine if message contains a valid command prefix
    prefix: function prefix(message) {
        return prefixMod.execute(message);
    },
};

// Object to store command functions, called from filter() in module.exports
const commandFunctions = {
    commands: function commands(message) {
        return commandsMod.execute(message, commandsSummary);
    },

    help: function help(message) {
        return helpMod.execute(message, commandsAndFeaturesDetailed);
    },

    ping: function ping(message) {
        return pingMod.execute(message);
    },
};

// An organised object of commands sorted by their type complete with a short summary
const commandsSummary = {
    core: {
        commands: 'PM user with a complete list of commands',
        help: 'Provide basic information, or a more detailed explanation of a command with "!help (command)"',
    },

    bot: {
        ping: 'Pong! Test the bot\'s pingtime',
    },
};

const commandsAndFeaturesDetailed = {
    commands: 'PM the user with a complete list of commands',
    help: 'Provide basic assistance such as how to access a list of commands, alternatively `%help ' +
        '(command)` for a more in depth explination of a command',
    ping: 'Replies with bot pingtime (this is calculated to be the difference between the timestamp on' +
    ' the user\'s `%ping` message, and the timestamp on the bot\'s response)',
};
