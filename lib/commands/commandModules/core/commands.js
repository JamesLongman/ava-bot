'use strict';

// Module to handle the !commands command, replies to user with available bot commands

const log = require('../../../logger.js')(module);

module.exports = {
    execute: function execute(message, summary) {
        log.info(`Called by ${message.member.displayName} (${message.author.id}), on ${message.guild.name}` +
            ` (${message.guild.id})`);

        // Initial reply to channel confirming the user will be PM'd
        message.channel.sendMessage(`I'll PM you with a list of commands ${message.member.displayName}`)
            .then(log.silly('Succesfully replied to channel'))
            .catch((err) => {
                log.warn(`Failed to reply to channel, ${err}`);
            });

        // Assemble the message to be sent to the user
        let toSend = '__**Command List**__';
        // Add core commands
        toSend += '\n\n**Core Commands:**';
        for (const x in summary.core) {
            toSend += `\n\`%${x}\` ${summary.core[x]}`;
        }
        // Add bot commands
        toSend += '\n\n**Bot Commands:**';
        for (const x in summary.bot) {
            toSend += `\n\`%${x}\` ${summary.bot[x]}`;
        }

        // Send constructed message to user
        message.author.sendMessage(toSend)
            .then(log.silly('Succesfully sent user command list'))
            .catch((err) => {
                log.warn(`Failed to send user command list, ${err}`);
            });
    },
};
