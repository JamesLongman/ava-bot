'use strict';

// Module to handle the %commands command, replies to user with available bot commands

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

        message.member.sendEmbed(summary(prefix).core)
            .then(() => {
                log.silly('Successfully sent core commands to user');
                botCommands(message, summary, prefix);
            })
            .catch((err) => {
                log.warn(`Failed to send embed, ${err}`);
            });
    },
};

function botCommands(message, summary, prefix) {
    message.member.sendEmbed(summary(prefix).bot)
        .then(() => {
            log.silly('Successfully sent bot commands to user');
            configurationCommands(message, summary, prefix);
        })
        .catch((err) => {
            log.warn(`Failed to send embed, ${err}`);
        });
}

function configurationCommands(message, summary, prefix) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        message.member.sendEmbed(summary(prefix).configuration)
            .then(() => {
                log.silly('Successfully sent configuration commands to user');
                funCommands(message, summary, prefix);
            })
            .catch((err) => {
                log.warn(`Failed to send embed, ${err}`);
            });
    }
}

function funCommands(message, summary, prefix) {
    message.member.sendEmbed(summary(prefix).fun)
        .then(() => {
            log.silly('Successfully sent configuration commands to user');
        })
        .catch((err) => {
            log.warn(`Failed to send embed, ${err}`);
        });
}
