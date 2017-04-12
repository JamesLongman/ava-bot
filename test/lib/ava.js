'use strict';

// Simply checks to make sure ava/js exists, can't do much elses

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const config = require('../../config/config.js');
const fs = require('fs');

describe('lib/ava.js', () => {
    it('should exist', () => {
        fs.existsSync(`${config.getConfig().root}/lib/ava.js`).should.be.true;
    });
});
