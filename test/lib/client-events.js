'use strict';

// Tests client-events.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const clientEvents = require('../../lib/client-events.js');

describe('lib/client-events.js', () => {
    it('should have function disconnect', () => {
        clientEvents.should.have.property('disconnect');
        clientEvents.disconnect.should.be.a('function');
    });

    it('should have function message', () => {
        clientEvents.should.have.property('message');
        clientEvents.message.should.be.a('function');
    });

    it('should have function ready', () => {
        clientEvents.should.have.property('ready');
        clientEvents.ready.should.be.a('function');
    });

    it('should have function reconnecting', () => {
        clientEvents.should.have.property('reconnecting');
        clientEvents.reconnecting.should.be.a('function');
    });

    it('should have function warn', () => {
        clientEvents.should.have.property('warn');
        clientEvents.warn.should.be.a('function');
    });
});
