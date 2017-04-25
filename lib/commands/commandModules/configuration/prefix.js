'use strict';

// Module to handle the %prefix command, used to set the command prefix used for a server

const config = require('../../../../config/config.js');
const log = require('../../../logger.js')(module);
const mysql = require('mysql');
const servers = require('../../../botData/servers.js');

const database = config.getConfig().database;

module.exports = {
    execute: function execute(message) {
        log.verbose(`Called by ${message.member.displayName} (${message.author.id}), on ${message.guild.name}` +
            ` (${message.guild.id})`);

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            // Failure case of member not being an admin
            message.channel.sendMessage('I\'m afraid that only the admins of a server may set the prefix ' +
                `that I respond to ${message.member.displayName}`)
                .then(log.silly('Succesfully sent failure message (admin case)'))
                .catch((err) => {
                    log.warn(`Failed to send pong message, ${err}`);
                });
        } else if (message.cleanContent.length !== 9) {
            // Failure case of incorrectly formatted prefix
            message.channel.sendMessage('I\'m afraid that command wasn\'t correctly formatted ' +
                `${message.member.displayName}, please make sure you're leaving a space after prefix ` +
                'and that your prefix is a single character, example: `%prefix !`')
                .then(log.silly('Succesfully sent failure message (command length case)'))
                .catch((err) => {
                    log.warn(`Failed to send pong message, ${err}`);
                });
        } else if (message.cleanContent.substring(8) === '#' ||
            message.cleanContent.substring(8) === '@' ||
            message.cleanContent.substring(8) === '/' ||
            message.cleanContent.substring(8) === ' ') {
            // Failure case of reserved prefixes
            message.channel.sendMessage('I\'m afraid that prefix is not available for use, please note ' +
                'that `#`, `@` and `/` are heavily relied upon by discord and aren\'t good prefix ideas. ' +
                'If you\'re looking for recommendations I\'d suggest `!`, `$`, `%`, `&` or `+` as ' +
                'everyone likely has those characters on their keyboards')
                .then(log.silly('Succesfully sent failure message (Reserved prefix case)'))
                .catch((err) => {
                    log.warn(`Failed to send pong message, ${err}`);
                });
        } else {
            // Success case, record change
            let preferences = servers.getServer(message.guild.id).preferences;

            message.channel.sendMessage(`Thanks ${message.member.displayName}, I'll update ` +
                'your server\'s preferences, the command prefix for your server is now set as ' +
                `\`${message.cleanContent.substring(8)}\``)
                .then(log.silly('Succesfully sent failure message (command length case)'))
                .catch((err) => {
                    log.warn(`Failed to send pong message, ${err}`);
                });

            const connection = mysql.createConnection(database);
            connection.connect();

            if (preferences) {
                preferences.prefix = message.cleanContent.substring(8);
                servers.setPreferences(message.guild.id, preferences);

                connection.query(
                `UPDATE Preferences SET prefix = '${preferences.prefix}' WHERE guildID = '${message.guild.id}'`,
                (error, results) => {
                    if (error) { log.error(error); }
                    log.silly(`Updated database preferences for ${message.guild.id} ` +
                    `results: ${JSON.stringify(results)}`);
                    connection.end();
                });
            } else {
                preferences = config.getConfig().preferences;
                preferences.prefix = message.cleanContent.substring(8);

                servers.setPreferences(message.guild.id, preferences);

                preferences.guildID = message.guild.id;

                connection.query(
                'INSERT INTO Preferences set ?', preferences, (error, results) => {
                    if (error) { log.error(error); }
                    log.silly(`Created Preferences index for ${message.guild.id} ` +
                    `results: ${JSON.stringify(results)}`);
                    connection.end();
                });
            }
        }
    },
};
