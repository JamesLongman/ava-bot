'use strict';

// Master module for all bot commands

// General requirements
const discord = require('discord.js');
const log = require('../logger.js')(module);
const prefixCheck = require('./prefix.js');

// Command modules
const botStatsMod = require('./commandModules/bot/botStats.js');
const catsMod = require('./commandModules/fun/cats.js');
const commandsMod = require('./commandModules/core/commands.js');
const commandsChannelMod = require('./commandModules/configuration/commandsChannel.js');
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
        'botstats',
        'cats',
        'commands',
        'commandschannel',
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
        let cmd = message.content.toLowerCase().substring(1);
        if (cmd.indexOf(' ') !== -1) { cmd = cmd.substring(0, cmd.indexOf(' ')); }
        for (let i = 0; i < this.commandsList.length; i += 1) {
            if (cmd === (this.commandsList[i])) {
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
    botstats: function botstats(message) {
        return botStatsMod.execute(message);
    },

    cats: function cats(message) {
        return catsMod.execute(message);
    },

    commands: function commands(message) {
        return commandsMod.execute(message, commandsSummary);
    },

    commandschannel: function commandsChannel(message) {
        return commandsChannelMod.execute(message);
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
        fun: funEmbed(prefix),
    };
}

/* Function passed down to the help module which will call the function with the arguement of the
server's prefix to generate a rich embed to be sent to the user that will contain a detailed description
of the command or feature that the user wants information on */
function commandsAndFeaturesDetailed(prefix) {
    return {
        botstats: botStatsEmbed(prefix),
        cats: catsEmbed(prefix),
        commands: commandsEmbed(prefix),
        commandschannel: commandschannelEmbed(prefix),
        github: githubEmbed(prefix),
        help: helpEmbed(prefix),
        info: infoEmbed(prefix),
        invite: inviteEmbed(prefix),
        ping: pingEmbed(prefix),
        prefix: prefixEmbed(prefix),
    };
}

// ---- Rich embeds for a summary of commands that Ava has ----

function botEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('__Bot Commands:__',
            `\`${prefix}botStats\` Provides Ava bot statistics and metrics` +
            `\n\`${prefix}github\` Links to Ava's 100% open-source github repo` +
            `\n\`${prefix}invite\` Gives the link to invite Ava to your server` +
            `\n\`${prefix}info\` Gives info on the Ava bot project` +
            `\n\`${prefix}ping\` Pong! Test the bot's pingtime`);
}

function configurationEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('__Configuration Commands:__ (Admin only)',
            `\`${prefix}prefix\` Specify the prefix you wish the bot to use on your server, e.g. \`%\` or \`!\`` +
            `\n\`${prefix}commandsChannel\` set Ava to only respond to commands from a single channel`);
}

function coreEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('__Core Commands:__',
            `\`${prefix}commands\` PM user with a complete list of commands` +
            `\n\`${prefix}help\` Provide basic information on bot operations, or alternatively a more detailed ` +
            `explanation of any command or bot feature using the command \`${prefix}help (command/feature)\``);
}

function funEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('__Fun Commands:__',
            `\`${prefix}cats\` Post a picture of a cat to the channel, or use \`${prefix}cats gif\` ` +
            'if you would like a gif of a cat');
}

// ---- Rich embeds for detailed descriptions of commands or features ----

function botStatsEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}botStats`)
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Bot command*' +
            '\nPermissions Required: *None*')
        .addField('Description', `\`${prefix}botStats\` will provide metrics and statistics relevant to ` +
            'Ava bot. Such as the number of servers Ava operates on, and what version of node Ava ' +
            'is running on')
        .addField('Use Example', `${prefix}botStats`);
}

function catsEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}cats`)
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Fun command*' +
            '\nPermissions Required: *None*')
        .addField('Description', `\`${prefix}cats\` will fetch an image of a cat from TheCatAPI.com ` +
            'and post it to the channel. Gifs of cats are also available via the command ' +
            `\`${prefix}cats gif\``)
        .addField('Use Examples', `${prefix}cats` +
            `\n${prefix}cats gif`);
}

function commandsEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}commands`)
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Core command*' +
            '\nPermissions Required: *None*')
        .addField('Description', `\`${prefix}commands\` will PM the user with a list of bot commands. ` +
            'By default I will only PM people with commands that they have access to however the ' +
            `full list of all bot commands is available by using \`${prefix}commands full\``)
        .addField('Use Examples', `${prefix}commands` +
            `\n${prefix}commands full`);
}

function commandschannelEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}commandsChannel`)
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Configuration command*' +
            '\nPermissions Required: *Admin*')
        .addField('Description', `\`${prefix}commandsChannel\` will set Ava to only respond to ` +
            'commands in a single channel on your server. To set a channel as your server\'s command ' +
            `channel use a #mention, for example \`${prefix}commandsChannel #general\`. ` +
            'Should you wish to restore Ava to the default setting of responding to commands in any ' +
            `channel please use the command \`${prefix}commandsChannel default\``)
        .addField('Use Examples', `${prefix}commandsChannel #general` +
            `\n${prefix}commandsChannel #mentionableTextChannel` +
            `\n${prefix}commandsChannel default`);
}

function githubEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}github`)
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Bot command*' +
            '\nPermissions Required: *None*')
        .addField('Description', 'Interested in building your own bot and want to see Ava\'s code? Want to help work ' +
            'on the project? Use this command for a link to the open-source github repository')
        .addField('Use Example', `${prefix}github`);
}

function helpEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}help`)
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Core command*' +
            '\nPermissions Required: *None*')
        .addField('Description', 'Provide basic assistance such as how to access a list of commands, ' +
            `alternatively you can use \`${prefix}help (command/feature)\` for a more in depth ` +
            'explanation of a command or bot feature')
        .addField('Use Examples', `${prefix}help` +
            `\n${prefix}help commands` +
            `\n${prefix}help github`);
}

function infoEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}info`)
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Bot command*' +
            '\nPermissions Required: *None*')
        .addField('Description', 'Gives info on the Ava bot project')
        .addField('Use Example', `${prefix}info`);
}

function inviteEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}invite`)
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Bot command*' +
            '\nPermissions Required: *None*')
        .addField('Description', 'Provides the link required to invite Ava onto your server')
        .addField('Use Example', `${prefix}invite`);
}

function pingEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}ping`)
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Bot command*' +
            '\nPermissions Required: *None*')
        .addField('Description', 'Replies with bot pingtime (this is calculated to be the difference ' +
            `between the timestamp on the user's \`${prefix}ping\` message, and the timestamp on the ` +
            'bot\'s response)')
        .addField('Use Example', `${prefix}ping`);
}

function prefixEmbed(prefix) {
    return new discord.RichEmbed()
        .setAuthor('Ava', 'http://i.imgur.com/ZJEGUIk.jpg')
        .setTitle(`__Command:__ ${prefix}prefix`)
        .setColor('#0275ea')
        .setThumbnail('http://i.imgur.com/RDvjDQ0.jpg')
        .addField('Specifications',
            'Type: *Configuration command*' +
            '\nPermissions Required: *Admin*')
        .addField('Description', 'Specifies the prefix you wish the bot to use on your server (useful if ' +
            'you have multiple bots). For example if you want all bot commands to be preceded with a ' +
            '"." you would use `%prefix .` by default, then all commands would be preceded by `.`, ' +
            'rather than `%`')
        .addField('Use Example', `${prefix}prefix !` +
            `${prefix}prefix %` +
            `${prefix}prefix .`);
}
