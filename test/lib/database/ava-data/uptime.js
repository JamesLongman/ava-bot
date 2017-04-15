'use strict';

// Tests uptime.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const uptime = require('../../../../lib/database/ava-data/uptime.js');

describe('lib/client-events.js', () => {
    it('should have function boot', () => {
        uptime.should.have.property('boot');
        uptime.disconnect.should.be.a('function');
    });
});
