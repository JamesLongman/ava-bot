'use strict';

/* Servers.js is used to store up to date maps of all servers that AVA is on, as well as listing the configs
for that server e.g. (custom prefix, custom features) */

let booted = false;
let servers = {};
/* servers.(guildID).guild should store the map of the guild
servers.(guildID).preferences should store the server's preferences */

module.exports = {
    // Getter function to pass a server object
    getServer(id) {
        if (id && servers[id]) {
            return servers[id];
        }
        return false;
    },

    // Setter function for when we would like to set an entire server property
    setServer(id, value) {
        if (id !== undefined) {
            servers[id] = value;
            return true;
        }
        return false;
    },

    // Setter function for when we would like to set the configs property of a server
    setPreferences(id, value) {
        if (id !== undefined) {
            servers[id].preferences = value;
            return true;
        }
        return false;
    },

    // Setter function for when we would like to set the guild property of a server
    setGuild(id, value) {
        if (id !== undefined) {
            servers[id].guild = value;
            return true;
        }
        return false;
    },

    // Getter function for grabbing the entire servers object
    get() {
        if (servers) { return servers; }
        return false;
    },

    // Setter function for setting the entire servers object
    set(value) {
        if (value) { servers = value; return true; }
        return false;
    },

    getBooted() {
        return booted;
    },

    setBooted() {
        booted = true;
    },
};
