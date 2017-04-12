'use strict';

// Validate the logger to make sure it's correctly configured

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const log = require('../../lib/logger.js')(module);

describe('lib/logger.js', () => {
    it('should have correct logging methods', () => {
        log.debug.should.be.a('function');
        log.verbose.should.be.a('function');
        log.info.should.be.a('function');
        log.warn.should.be.a('function');
        log.error.should.be.a('function');
    });

    it('should only output to console', () => {
        Object.keys(log.transports).length.should.eql(1);
        log.transports.console.should.be.an('object');
    });
});
