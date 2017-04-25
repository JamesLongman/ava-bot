'use strict';

/* Module to handle the %commandsChannel command, used to set a command channel for a server
so that the bot will not respond to messages in any other channel */

const config = require('../../../../config/config.js');
const log = require('../../../logger.js')(module);
const mysql = require('mysql');
const servers = require('../../../botData/servers.js');

const database = config.getConfig().database;

module.exports = {
    execute: function execute(message) {
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

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            // Failure case of member not being an admin
            message.channel.sendMessage('I\'m afraid that only the admins of a server may set a command ' +
                `channel ${message.member.displayName}`)
                .then(log.silly('Succesfully sent failure message (admin case)'))
                .catch((err) => {
                    log.warn(`Failed to send pong message, ${err}`);
                });
            return false;
        } else if (message.content.indexOf('default') !== -1) {
            // Reset to default case of not restricting commands to a command channel
            message.channel.sendMessage(`Ok ${message.member.displayName}, I will reset the ` +
                'command channel option to default and respond to commands in any channel')
                .then(log.silly('Succesfully sent failure message (command length case)'))
                .catch((err) => {
                    log.warn(`Failed to send pong message, ${err}`);
                });

            const connection = mysql.createConnection(database);
            connection.connect();

            const preferences = servers.getServer(message.guild.id).preferences;
            if (preferences && preferences.commandChannel) { delete preferences.commandChannel; }
            servers.setPreferences(message.guild.id, preferences);

            connection.query(`SELECT * FROM Preferences WHERE guildID = '${message.guild.id}'`,
            (error, results) => {
                if (Object.keys(results).length === 0) {
                    // No current command channel recorded in database so no need to reset to default of null
                }
                connection.query(
                'UPDATE Preferences SET commandChannel = NULL' +
                ` WHERE guildID = '${message.guild.id}'`,
                (error2, results2) => {
                    if (error2) { log.error(error2); }
                    log.silly(`Updated database preferences for ${message.guild.id} ` +
                    `results: ${JSON.stringify(results2)}`);
                    connection.end();
                });
            });
            return true;
        } else if (message.mentions.channels.size !== 1) {
            // Failure case of incorrectly formatted prefix
            message.channel.sendMessage('I\'m afraid that command wasn\'t correctly formatted ' +
                `${message.member.displayName}, please make sure that you mention the single channel ` +
                `that you wish to set as the command channel on your server, for example \`${prefix}` +
                `commandchannel ${message.guild.defaultChannel}\``)
                .then(log.silly('Succesfully sent failure message (command length case)'))
                .catch((err) => {
                    log.warn(`Failed to send pong message, ${err}`);
                });
            return false;
        }
            // Success case, record change
        let preferences = servers.getServer(message.guild.id).preferences;

        message.channel.sendMessage(`Thanks ${message.member.displayName}, I'll update ` +
                'your server\'s preferences, the command channel on your server is now set as ' +
                `${message.mentions.channels.array()[0]}`)
                .then(log.silly('Succesfully sent failure message (command length case)'))
                .catch((err) => {
                    log.warn(`Failed to send pong message, ${err}`);
                });

        const connection = mysql.createConnection(database);
        connection.connect();

        if (preferences) {
            preferences.commandChannel = message.mentions.channels.array()[0].id;
            servers.setPreferences(message.guild.id, preferences);

            connection.query(
                `UPDATE Preferences SET commandChannel = '${message.mentions.channels.array()[0].id}'` +
                ` WHERE guildID = '${message.guild.id}'`,
                (error, results) => {
                    if (error) { log.error(error); }
                    log.silly(`Updated database preferences for ${message.guild.id} ` +
                    `results: ${JSON.stringify(results)}`);
                    connection.end();
                });
            return true;
        }
        preferences = config.getConfig().preferences;
        preferences.commandChannel = message.mentions.channels.array()[0].id;

        servers.setPreferences(message.guild.id, preferences);

        preferences.guildID = message.guild.id;

        connection.query(
            'INSERT INTO Preferences set ?', preferences, (error, results) => {
                if (error) { log.error(error); }
                log.silly(`Created Preferences index for ${message.guild.id} ` +
                `results: ${JSON.stringify(results)}`);
                connection.end();
            });
        return true;
    },
};
