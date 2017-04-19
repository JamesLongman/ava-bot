'use strict';

/* Primary config module, using getters and setters this module can alter the config
and pull valuesfrom other files */

/* eslint import/no-dynamic-require: 0 */

const envConfig = require('./environment.js');

// Require enviroment first so we are able to use environment specific configs
const environment = envConfig.environment;

// Require environment specific configs
const generalConfig = require(`./${environment}/general.js`);
const preferencesConfig = require(`./${environment}/preferences.js`);

let config = {
    // Enviroment configs
    botUserID: envConfig.botUserID, // The user ID of the bot
    database: envConfig.database, // mysql database connection data
    environment, // Environment (production, staging, development or testing)
    root: envConfig.root, // The path to the project file
    token: envConfig.token, // Bot token

    // Environment specific configs
    general: generalConfig,
    preferences: preferencesConfig,
};

module.exports = {
    // Getter function to pass the entire config object
    getConfig() {
        if (config) {
            return config;
        }
        return false;
    },

    // Setter function for when we would like to set the value of the entire config
    setConfig(newConfig) {
        if (newConfig !== undefined) {
            config = newConfig;
            return true;
        }
        return false;
    },

    // Setter function for when we would like to set the value of a specific config property
    setConfigProperty(property, value) {
        if (property !== undefined && value !== undefined) {
            config[property] = value;
            return true;
        }
        return false;
    },
};
