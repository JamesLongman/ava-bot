'use strict';

/* This module records the connection time of the bot, connection time is recorded in ms and is
updated in the database every 5 minutes or whenever the bot disconnects/reconnects
connection time which will be tracked seperately) */

const config = require('../../../config/config.js');
const log = require('../../logger.js')(module);
const moment = require('moment');
const mysql = require('mysql');

const database = config.getConfig().database;

let intervalStarted = false;
let previousEvent = false;
let timer;


module.exports = {
    // Called on client disconnect event
    disconnect() {
        log.debug('Disconnect');
        clearInterval(timer);
        if (previousEvent) {
            count(previousEvent, Date.now() - intervalStarted);
        }
        previousEvent = 'disconnected';
        intervalStarted = Date.now();
        timer = setInterval(() => {
            count('disconnected', 300000);
        }, 300000);
    },

    // Called on client ready event
    ready() {
        log.debug('Ready');
        clearInterval(timer);
        if (previousEvent) {
            count('disconnected', Date.now() - intervalStarted);
        }
        previousEvent = 'connected';
        intervalStarted = Date.now();
        timer = setInterval(() => {
            count('connected', 300000);
        }, 300000);
    },
};

// Called every 300 seconds by interval in boot function
function count(collumn, time) {
    const date = moment().format('YYYY-MM-DD'); // Uses momentjs to easily format date for SQL

    const connection = mysql.createConnection(database);
    connection.connect();

    // In the Connection table, see if we currently have connection counted for today, if so how much
    connection.query(`SELECT * FROM Connection WHERE date = '${date}'`,
    (error, results) => {
        if (error) { log.error(error); }
        log.silly(`Database querry for uptime: ${JSON.stringify(results)}`);
        // No uptime recorded for today's date in database
        if (Object.keys(results).length === 0) {
            const values = { date };
            values[collumn] = time;

            // Insert row into uptime for today's date with the uptime value of 1
            connection.query('INSERT INTO Uptime set ?', values, (error2, results2) => {
                if (error) { log.error(error); }
                log.silly(`Inserted new row: ${date} into uptime, results: ${JSON.stringify(results2)}`);
                connection.end();
            });
        // Uptime recorded for today, ammend to be one greater
        } else {
            const plusTime = results[0][collumn] + time;
            connection.query(`UPDATE Uptime SET ${collumn} = '${plusTime}' WHERE date = '${date}'`,
            (error2, results2) => {
                if (error) { log.error(error); }
                log.silly(`Updated database uptime for ${date}, results: ${JSON.stringify(results2)}`);
                connection.end();
            });
        }
        connection.end();
    });
}
