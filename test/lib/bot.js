'use strict';

// Tests bot.js

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const config = require('../../config/config.js');
const fs = require('fs');

describe('lib/bot.js', () => {
    it('should exist', () => {
        fs.existsSync(`${config.getConfig().root}/lib/bot.js`).should.be.true;
    });
});
