'use strict';

// Tests servers.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0, prefer-const: 0 */

const should = require('chai').should();

const servers = require('../../lib/servers/servers.js');

describe('lib/servers/servers.js', () => {
    let originalServers;
    before(() => {
        originalServers = servers.get();
    });

    after(() => {
        if (originalServers) { servers.set(originalServers); }
    });

    it('should have all expected properties', () => {
        servers.should.have.property('getServer');
        servers.getServer.should.be.a('function');
        servers.should.have.property('setServer');
        servers.setServer.should.be.a('function');
        servers.should.have.property('setConfigs');
        servers.setConfigs.should.be.a('function');
        servers.should.have.property('setGuild');
        servers.setGuild.should.be.a('function');
        servers.should.have.property('get');
        servers.get.should.be.a('function');
        servers.should.have.property('set');
        servers.set.should.be.a('function');
    });
});
