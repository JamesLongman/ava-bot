'use strict';

/* This module handles client boot events, (while technichally not a distinct event in itself, the first
client ready event is a significant enough event to warrent its own module) */

const bootProcess = require('../../bootProcess.js');
const config = require('../../../config/config.js');
const log = require('../../logger.js')(module);
const moment = require('moment');
const mysql = require('mysql');
const servers = require('../../servers/servers.js');

const database = config.getConfig().database;

module.exports = {
    // Called on first client ready event
    execute(client) {
        log.verbose('Running');
        reconciliation(client);
    },
};

/* Make sure that all servers cached in the client's .guilds map are stored in the database, if they aren't
make an entry for them (a server not being in the database is most likely due to it being added while
the bot was down) */
function reconciliation(client) {
    const connection = mysql.createConnection(database);
    connection.connect();

    // Update uptime to new value for today's date in the uptime table
    connection.query('SELECT guildID FROM Servers', (error, results) => {
        if (error) { log.error(error); }
        connection.end();
        log.silly('Queried guild IDs from database');
        const guildIDs = [];
        for (const x in results) {
            guildIDs.push(results[x].guildID);
        }
        const addPromises = [];
        for (const guild of client.guilds) {
            if (guildIDs.indexOf(guild[1].id) === -1) {
                addPromises.push(addServer(guild[1].id));
            }
        }
        Promise.all(addPromises)
            .then(() => {
                if (addPromises.length > 0) { log.warn(`Added ${addPromises.length} servers to database`); }
                bootProcess.reconciliationComplete();
                assembleServerPreferences();
            })
            .catch((err) => {
                log.error(`Error during boot process, ${err}`);
            });
    });
}

// When a server is found that is not in the database add it to the database
function addServer(guild) {
    return new Promise((resolve) => {
        const connection = mysql.createConnection(database);
        connection.connect();

        const values = {
            guildID: guild,
            joined: moment().format('YYYY-MM-DD HH:mm:ss'),
        };

        // Update uptime to new value for today's date in the uptime table
        connection.query('INSERT INTO Servers set ?', values, (error) => {
            if (error) { log.error(error); }
            log.silly('Added guild to database in boot reconciliation');
            connection.end();
            resolve(true);
        });
    });
}

function assembleServerPreferences() {
    const connection = mysql.createConnection(database);
    connection.connect();

    // Update uptime to new value for today's date in the uptime table
    connection.query('SELECT guildID, customised FROM Servers', (error, results) => {
        if (error) { log.error(error); }
        connection.end();
        log.silly('Queried reconciled guild IDs from database');

        const savePromises = [];
        for (const x in results) {
            if (results[x].customised === 1) {
                savePromises.push(savePreferences(results[x].guildID));
            }
        }

        Promise.all(savePromises)
            .then(() => {
                log.verbose(`Saved configs of ${savePromises.length} servers`);
                bootProcess.serversConfigsComplete();
            })
            .catch((err) => {
                log.error(`Error during boot process, ${err}`);
            });
    });
}

// When a server is found that is not in the database add it to the database
function savePreferences(guild) {
    return new Promise((resolve) => {
        const connection = mysql.createConnection(database);
        connection.connect();

        // Update uptime to new value for today's date in the uptime table
        connection.query(`SELECT * FROM Preferences WHERE guildID = ${guild}`, (error, results) => {
            if (error) { log.error(error); }
            connection.end();
            if (results.length > 1) {
                log.error(`Expected only 1 result for server preferences: ${JSON.stringify(results)}`);
            }
            log.silly(`Queried Preferences for server: ${guild}`);
            const configs = results[0];
            delete configs.guildID;
            servers.setPreferences(guild, configs);
            resolve(true);
        });
    });
}
