'use strict';

// Master module for all bot commands

// General requirements
const log = require('../logger.js')(module);
const prefixCheck = require('./prefix.js');

// Command modules
const commandsMod = require('./commandModules/core/commands.js');
const githubMod = require('./commandModules/bot/github.js');
const helpMod = require('./commandModules/core/help.js');
const inviteMod = require('./commandModules/bot/invite.js');
const pingMod = require('./commandModules/bot/ping.js');
const prefixMod = require('./commandModules/configuration/prefix.js');

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
        'github',
        'help',
        'invite',
        'ping',
        'prefix',
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
        return prefixCheck.execute(message);
    },
};

// Object to store command functions, called from filter() in module.exports
const commandFunctions = {
    commands: function commands(message) {
        return commandsMod.execute(message, commandsSummary);
    },

    github: function github(message) {
        return githubMod.execute(message);
    },

    help: function help(message) {
        return helpMod.execute(message, commandsAndFeaturesDetailed);
    },

    invite: function invite(message) {
        return inviteMod.execute(message);
    },

    ping: function ping(message) {
        return pingMod.execute(message);
    },

    prefix: function ping(message) {
        return prefixMod.execute(message);
    },
};

// An organised object of commands sorted by their type complete with a short summary
function commandsSummary(prefix) {
    return {
        core: {
            commands: 'PM user with a complete list of commands',
            help: `Provide basic information, or a more detailed explanation of a command with \`${prefix}` +
                'help (command)`',
        },

        configuration: {
            prefix: 'Specify the prefix you wish the bot to use on your server, e.g. `%` or `!`',
        },

        bot: {
            github: 'Links to Ava\'s 100% open-source github repo',
            invite: 'Gives the link to invite Ava to your server',
            ping: 'Pong! Test the bot\'s pingtime',
        },
    };
}

function commandsAndFeaturesDetailed(prefix) {
    return {
        commands: 'PM the user with a complete list of commands',
        github: 'Interested in building your own bot and want to see Ava\'s code? Want to help work ' +
            'on the project? Use this command for a link to the repository',
        help: 'Provide basic assistance such as how to access a list of commands, alternatively you can ' +
            `use \`${prefix}help (command/feature)\` for a more in depth explanation of a command or bot ` +
            'feature',
        invite: 'Provides the link required to invite Ava onto your server',
        ping: 'Replies with bot pingtime (this is calculated to be the difference between the timestamp on' +
            ` the user's \`${prefix}ping\` message, and the timestamp on the bot's response)`,
        prefix: 'Specifies the prefix you wish the bot to use on your server (useful if you have multiple bots). ' +
            'For example if you want all bot commands to be preceded with a "." you would use `%prefix .` ' +
            'by default, then all commands would be preceded by `.`, rather than `%`',
    };
}
