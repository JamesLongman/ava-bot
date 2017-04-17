'use strict';

// Tests database.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0 */

const should = require('chai').should();

const database = require('../../../lib/database/database.js');

describe('lib/database/database.js', () => {
    it('should have function boot', () => {
        database.should.have.property('boot');
        database.boot.should.be.a('function');
    });
});
