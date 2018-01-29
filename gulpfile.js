/* globals require */

// eslint-disable-next-line strict
'use strict';

// General
var gulp = require('gulp-help')(require('gulp'));
var localConfig = {};

try {
  localConfig = require('./local.gulp-config');
}
catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
}
require('emulsify-gulp')(gulp, localConfig);
