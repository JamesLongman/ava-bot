'use strict';

/* This module will run ESLint tests on all specified files, warnings will not cause failure but errors
will */

const lint = require('mocha-eslint');

// Array of paths to lint
const paths = [
    'config/*',
    'lib/*',
    'test/*',
    '!test/mocha.opts',
];

const options = {
  // Specify style of output
    formatter: 'compact',

  // Only display ESLint warnings if a test is failing
    alwaysWarn: false,

  // Increase the time until a test is marked as slow
    slow: 1000,  // Defaults to the global mocha `slow` option
};

// Run the tests
lint(paths, options);
