'use strict';

// Module to handle the !commands command, replies to user with available bot commands

const config = require('../../../../config/config.js');
const log = require('../../../logger.js')(module);
const servers = require('../../../servers/servers.js');

module.exports = {
    execute: function execute(message, summary) {
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
        for (const x in summary(prefix).core) {
            toSend += `\n\`${prefix}${x}\` ${summary(prefix).core[x]}`;
        }
        // Add bot commands
        toSend += '\n\n**Bot Commands:**';
        for (const x in summary(prefix).bot) {
            toSend += `\n\`${prefix}${x}\` ${summary(prefix).bot[x]}`;
        }
        // If user is an admin of the server, add admin commands
        if (message.member.hasPermission('ADMINISTRATOR')) {
            toSend += '\n\n**Bot Configuration Commands:** (Server Admins Only)';
            for (const x in summary(prefix).bot) {
                toSend += `\n\`${prefix}${x}\` ${summary(prefix).configuration[x]}`;
            }
        }

        // Send constructed message to user
        message.author.sendMessage(toSend)
            .then(log.silly('Succesfully sent user command list'))
            .catch((err) => {
                log.warn(`Failed to send user command list, ${err}`);
            });
    },
};
