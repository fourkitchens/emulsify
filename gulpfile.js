/* globals require */

'use strict';

// General
var gulp = require('gulp-help')(require('gulp'));
var _ = require('lodash');
var config = require('./gulp-config');
var localConfig = {};

try {
  localConfig = require('./local.gulp-config');
}
catch (e) {}
config = _.defaultsDeep(localConfig, config);
require('fourk-gulp')(gulp, config);
