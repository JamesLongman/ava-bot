'use strict';

// Tests database.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const database = require('../../../lib/database/database.js');

describe('lib/client-events.js', () => {
    it('should have function boot', () => {
        database.should.have.property('boot');
        database.disconnect.should.be.a('function');
    });
});
