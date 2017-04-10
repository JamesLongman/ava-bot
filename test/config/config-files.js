'use strict';

// Confirm config files exist and perform some basic validation

/* eslint global-require: 0 , no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const config = require('../../config/config.js');
const fs = require('fs');

describe('config files', () => {
    // This test failing would probably be indicitive of some form of docker file caching issue
    it('should have config file', () => {
        fs.existsSync(`${config.getConfig().root}/config/config.js`).should.be.true;
    });

    it('should have environment file', () => {
        fs.existsSync(`${config.getConfig().root}/config/environment.js`).should.be.true;
    });
});
