'use strict';

/* This module records the uptime of the bot, every full minute the process is running after the first
client ready event it will log that minute as a minute the bot was up (note: this is seperate from
connection time which will be tracked seperately) */

const config = require('../../../config/config.js');
const log = require('../../logger.js')(module);
const moment = require('moment');
const mysql = require('mysql');

const database = config.getConfig().database;

module.exports = {
    // Called on first client ready event
    boot() {
        log.info('Ready called in uptime');
        setInterval(count, 60000);
    },
};

// Ammend today's recorded uptime in the database and add 1 to it
function augmentDate(date, newUptime) {
    const connection = mysql.createConnection(database);
    connection.connect();

    // Update uptime to new value for today's date in the uptime table
    connection.query(`UPDATE uptime SET uptime = '${newUptime}' WHERE date = '${date}'`,
    (error, results) => {
        if (error) { log.error(error); }
        log.silly(`Updated database uptime for ${date}, results: ${results}`);
        connection.end();
    });
}

// Called every 60 seconds by interval in boot function
function count() {
    const date = moment().format('YYYY-MM-DD'); // Uses momentjs to easily format date for SQL

    const connection = mysql.createConnection(database);
    connection.connect();

    // In the uptime table, see if we currently have uptime counted for today, if so how much
    connection.query(`SELECT uptime FROM uptime WHERE date = '${date}'`,
    (error, results) => {
        if (error) { log.error(error); }
        log.silly(`Database querry for uptime: ${results}`);
        // No uptime recorded for today's date in database
        if (Object.keys(results).length === 0) {
            insertDate(date);
        // Uptime recorded for today, ammend to be one greater
        } else {
            const plusOne = results[0].uptime + 1;
            augmentDate(date, plusOne);
        }
        connection.end();
    });
}

// If this is the first minute of uptime recorded for today, create a new row for today's date
function insertDate(date) {
    const connection = mysql.createConnection(database);
    connection.connect();

    // Format data to be inserted into table
    const values = {
        date,
        uptime: 1,
    };

    // Insert row into uptime for today's date with the uptime value of 1
    connection.query('INSERT INTO uptime set ?', values, (error, results) => {
        if (error) { log.error(error); }
        log.silly(`Inserted new row: ${date} into uptime, results: ${results}`);
        connection.end();
    });
}
