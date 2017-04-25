'use strict';

/* Module to handle the %help command, replies with basic bot use information or a more detailed
explanation of any specific command */

const config = require('../../../../config/config.js');
const log = require('../../../logger.js')(module);
const servers = require('../../../botData/servers.js');

module.exports = {
    execute: function execute(message, details) {
        log.verbose(`Called by ${message.member.displayName} (${message.author.id}), on ${message.guild.name}` +
            ` (${message.guild.id})`);

        // First we will identify the prefix of the server using the command
        let prefix;
        if (servers.getServer(message.guild.id) && servers.getServer(message.guild.id).preferences) {
            // Server has custom preferences, use preffered prefix
            prefix = servers.getServer(message.guild.id).preferences.prefix;
        } else {
            // Server uses default settings, pull prefix from config
            prefix = config.getConfig().preferences.prefix;
        }

        // Now identify how the command is being used and respond accordingly
        if (message.cleanContent.length < 6) {
            // "%help" case
            message.channel.sendMessage(helpResponse(prefix))
                .then(log.silly('Succesfully sent reply to base command'))
                .catch((err) => {
                    log.warn(`Failed to send pong message, ${err}`);
                });
        // "%help command/feature" cases
        } else if (Object.prototype.hasOwnProperty.call(details(prefix),
        message.cleanContent.substring(6).toLowerCase())) {
            // Recognised command/feature, reply with detailed explanation
            const cmd = message.cleanContent.substring(6).toLowerCase();
            message.channel.sendEmbed(details(prefix)[cmd])
                .then(log.silly('Succesfully replied with details'))
                .catch((err) => {
                    log.warn(`Failed to send details to channel, ${err}`);
                });
        } else {
            // Could not recognise the command/feature, re-iterate the use of help
            message.channel.sendMessage('Sorry I couldn\'t recognise that command/feature, for generic ' +
                `help with bot use please use \`${prefix}help\`, or if you are looking for an explanation of a ` +
                `particular command/feature please use \`${prefix}help (command/feature)\`, for example ` +
                `\`${prefix}help ping\``)
                .then(log.silly('Succesfully replied with re-itteration of help use'))
                .catch((err) => {
                    log.warn(`Failed to send details to channel, ${err}`);
                });
        }
    },
};

// Standard response to "%help" command
function helpResponse(prefix) {
    return 'Hi I\'m AVA, a general purpose discord bot. I have many ' +
        'commands and features so please use the information below to find out more' +
        '\n\n**Prefixes:** Obviously you don\'t want me responding to everyday conversation, so ' +
        `all commands must therefore have a prefix on your server this is \`${prefix}\` (though this ` +
        'is customizable)' +
        `\n\n**Commands:** Your wish is my command, please use \`${prefix}commands\` and I ` +
        'will PM you a list of all commands enabled on your current server' +
        '\n\n**Features:** Many of my features are customizable to tailor my services to your ' +
        `server's needs, for a list of features please use \`${prefix}features\`` +
        '\n\n**Further Help:** Completely and utterly stuck? Further help can be found on AVA\'s discord ' +
        'server, ask silly questions here: https://discord.gg/me8kVJ5';
}
