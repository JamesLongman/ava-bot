'use strict';

// Master module for all bot commands

// General requirements
const discord = require('discord.js');
const log = require('../logger.js')(module);
const prefixCheck = require('./prefix.js');

// Command modules
const commandsMod = require('./commandModules/core/commands.js');
const githubMod = require('./commandModules/bot/github.js');
const helpMod = require('./commandModules/core/help.js');
const infoMod = require('./commandModules/bot/info.js');
const inviteMod = require('./commandModules/bot/invite.js');
const pingMod = require('./commandModules/bot/ping.js');
const prefixMod = require('./commandModules/configuration/prefix.js');

module.exports = {
    // Used to execute any given command
    commandCall: function filter(command, message) {
        if (Object.keys(commandFunctions).indexOf(command) !== -1) {
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
        'info',
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

    info: function info(message) {
        return infoMod.execute(message);
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
        bot: botEmbed(prefix),
        configuration: configurationEmbed(prefix),
        core: coreEmbed(prefix),
    };
}

/* Function passed down to the help module which will call the function with the arguement of the
server's prefix to generate a rich embed to be sent to the user that will contain a detailed description
of the command or feature that the user wants information on */
function commandsAndFeaturesDetailed(prefix) {
    return {
        commands: commandsEmbed(prefix),
        github: githubEmbed(prefix),
        help: helpEmbed(prefix),
        invite: inviteEmbed(prefix),
        ping: pingEmbed(prefix),
        prefix: prefixEmbed(prefix),
    };
}

// ---- Rich embeds for a summary of commands that Ava has ----

function botEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setColor('#0086AE')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('__Bot Commands:__',
            `\`${prefix}github\` Links to Ava's 100% open-source github repo` +
            `\n\`${prefix}invite\` Gives the link to invite Ava to your server` +
            `\n\`${prefix}ping\` Pong! Test the bot's pingtime`
            , true);
}

function configurationEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setColor('#0086AE')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('__Configuration Commands:__ (Admin only)',
            `\`${prefix}prefix\` Specify the prefix you wish the bot to use on your server, e.g. \`%\` or \`!\``
            , true);
}

function coreEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setColor('#0086AE')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('__Core Commands:__',
            `\`${prefix}commands\` PM user with a complete list of commands` +
            `\n\`${prefix}help\` Provide basic information on bot operations, or alternatively a more detailed ` +
            `explanation of any command or bot feature using the command \`${prefix}help (command/feature)\``, true);
}

// ---- Rich embeds for detailed descriptions of commands or features ----

function commandsEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}commands`)
        .setColor('#0086AE')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Core command*' +
            '\nPermissions Required: *None*', true)
        .addField('Description', `\`${prefix}commands\` will PM the user with a list of bot commands. ` +
            'By default I will only PM people with commands that they have access to however the ' +
            `full list of all bot commands is available by using \`${prefix}commands full\``, true)
        .addField('Use Examples', `${prefix}commands` +
            `\n${prefix}commands full`, true);
}

function githubEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}github`)
        .setColor('#0086AE')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Bot command*' +
            '\nPermissions Required: *None*', true)
        .addField('Description', 'Interested in building your own bot and want to see Ava\'s code? Want to help work ' +
            'on the project? Use this command for a link to the open-source github repository', true)
        .addField('Use Example', `${prefix}github`, true);
}

function helpEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}help`)
        .setColor('#0086AE')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Core command*' +
            '\nPermissions Required: *None*', true)
        .addField('Description', 'Provide basic assistance such as how to access a list of commands, ' +
            `alternatively you can use \`${prefix}help (command/feature)\` for a more in depth ` +
            'explanation of a command or bot feature', true)
        .addField('Use Examples', `${prefix}help` +
            `\n${prefix}help commands` +
            `\n${prefix}help github`, true);
}

function inviteEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}invite`)
        .setColor('#0086AE')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Bot command*' +
            '\nPermissions Required: *None*', true)
        .addField('Description', 'Provides the link required to invite Ava onto your server', true)
        .addField('Use Example', `${prefix}invite`, true);
}

function pingEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}ping`)
        .setColor('#0086AE')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Bot command*' +
            '\nPermissions Required: *None*', true)
        .addField('Description', 'Replies with bot pingtime (this is calculated to be the difference ' +
            `between the timestamp on the user's \`${prefix}ping\` message, and the timestamp on the ` +
            'bot\'s response)', true)
        .addField('Use Example', `${prefix}ping`, true);
}

function prefixEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}prefix`)
        .setColor('#0086AE')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Configuration command*' +
            '\nPermissions Required: *Admin*', true)
        .addField('Description', 'Specifies the prefix you wish the bot to use on your server (useful if ' +
            'you have multiple bots). For example if you want all bot commands to be preceded with a ' +
            '"." you would use `%prefix .` by default, then all commands would be preceded by `.`, ' +
            'rather than `%`', true)
        .addField('Use Example', `${prefix}prefix !` +
            `${prefix}prefix %` +
            `${prefix}prefix .`, true);
}
