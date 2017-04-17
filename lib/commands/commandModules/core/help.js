'use strict';

/* Module to handle the !help command, replies with basic bot use information or a more detailed
explination of any specific command */

const log = require('../../../logger.js')(module);

module.exports = {
    execute: function execute(message, details) {
        log.info(`Called by ${message.displayName} (${message.author.id}), on ${message.guild.name}` +
            ` (${message.guild.id})`);

        if (message.cleanContent.length < 6) {
            // "%help" case
            message.channel.sendMessage(helpReply)
                .then(log.debug('Succesfully sent pong message'))
                .catch((err) => {
                    log.warn(`Failed to send pong message, ${err}`);
                });
        } else if (Object.prototype.hasOwnProperty.call(details, message.cleanContent.substring(6))) {
            // Recognised command/feature, reply with detailed explination
            const cmd = message.cleanContent.substring(6);
            message.channel.sendMessage(`\`%${cmd}\` ${details[cmd]}`)
                .then(log.silly('Succesfully replied with details'))
                .catch((err) => {
                    log.warn(`Failed to send details to channel, ${err}`);
                });
        } else {
            // Could not recognise the command/feature, re-iterate the use of help
            message.channel.sendMessage('Sorry I couldn\'t recognise that command/feature, for generic ' +
                'help with bot use please use `%help`, or if you are looking for an explination of a particular ' +
                'command/feature please use `%help (command/feature)`, for example `%help ping`')
                .then(log.silly('Succesfully replied with re-itteration of help use'))
                .catch((err) => {
                    log.warn(`Failed to send details to channel, ${err}`);
                });
        }
    },
};

// Message to be sent upon "%help"
const helpReply = 'Hi I\'m AVA, a general purpose discord bot. I have many commands and features ' +
    ' so please use the information below to find out more' +
    '\n\n**Prefixes:** Obviously you don\'t want me responding to everyday conversation, so all commands ' +
    'must therefore have a prefix on your server this is % (though this is customizable)' +
    '\n\n**Commands:** Your wish is my command, please use `%commands` and I will PM you ' +
    'a list of all commands enabled on your current server' +
    '\n\n**Features:** Many of my features are customizable to tailor my services to your server\'s needs, ' +
    'for a list of features please use `%features`' +
    '\n\n**Further Help:** Completely and utterly stuck? Further help can be found on AVA\'s discord ' +
    'server, ask silly questions here: https://discord.gg/me8kVJ5';
