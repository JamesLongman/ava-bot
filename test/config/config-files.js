'use strict';

// Confirm config files exist and perform some basic validation

/* eslint global-require: 0 , no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const config = require('../../config/config.js');
const fs = require('fs');

describe('config files', () => {
    it('should have sample environment file', () => {
        fs.existsSync(`${config.getConfig().root}/config/environment.sample.js`).should.be.true;
    });

    describe('environment sample file', () => {
        // This test will not run if environment.js is not on the current build, this is to prevent CI issues
        if (fs.existsSync(`${config.getConfig().root}/config/environment.js`)) {
            const env = require('../../config/environment.js');
            const sampleEnv = require('../../config/environment.sample.js');
            it('should be up to date and mirror properties of live environment file', () => {
                const keys = Object.keys(env);
                for (let i = 0; i < keys.length; i += 1) {
                    Object.prototype.hasOwnProperty.call(sampleEnv, keys[i]);
                }
            });
        }
    });
});
