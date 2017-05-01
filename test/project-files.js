'use strict';

// Simply checks project level files such as README.md to make sure they exist

/* eslint no-unused-vars: 0, no-unused-expressions: 0*/

const should = require('chai').should();

const config = require('../config/config.js');
const fs = require('fs');

describe('project files', () => {
    it('should have eslint config', () => {
        fs.existsSync(`${config.getConfig().root}/.eslintrc.json`).should.be.true;
    });

    it('should have git attributes', () => {
        fs.existsSync(`${config.getConfig().root}/.gitattributes`).should.be.true;
    });

    it('should have git ignore', () => {
        fs.existsSync(`${config.getConfig().root}/.gitignore`).should.be.true;
    });

    it('should have standard (development) docker composition', () => {
        fs.existsSync(`${config.getConfig().root}/docker-compose.yml`).should.be.true;
    });

    it('should have LICENSE', () => {
        fs.existsSync(`${config.getConfig().root}/LICENSE`).should.be.true;
    });

    it('should have package.json', () => {
        fs.existsSync(`${config.getConfig().root}/package.json`).should.be.true;
    });

    it('should have project readme', () => {
        fs.existsSync(`${config.getConfig().root}/README.md`).should.be.true;
    });
});
