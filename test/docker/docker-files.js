'use strict';

// Confirm bash scripts exist

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const config = require('../../config/config.js');
const fs = require('fs');

describe('docker files', () => {
    it('should have run bash script', () => {
        fs.existsSync(`${config.getConfig().root}/docker/run.sh`).should.be.true;
    });
});
