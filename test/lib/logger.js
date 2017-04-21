'use strict';

// Validate the logger to make sure it's correctly configured

/* eslint no-unused-vars: 0, no-unused-expressions: 0 */

const should = require('chai').should();

const log = require('../../lib/logger.js')(module);

describe('lib/logger.js', () => {
    it('should have correct logging methods', () => {
        log.silly.should.be.a('function');
        log.debug.should.be.a('function');
        log.verbose.should.be.a('function');
        log.info.should.be.a('function');
        log.warn.should.be.a('function');
        log.error.should.be.a('function');
    });
});
