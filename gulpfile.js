/* globals require */

// General
const gulp = require('gulp-help')(require('gulp')); // eslint-disable-line import/no-extraneous-dependencies

let localConfig = {};

try {
  localConfig = require('./local.gulp-config'); // eslint-disable-line import/no-unresolved
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
}
require('emulsify-gulp')(gulp, localConfig);
