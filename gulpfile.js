(function () {
  'use strict';

  // General
  var gulp = require('gulp-help')(require('gulp'));
  var _ = require('lodash');
  var localConfig = {};

  try {
    localConfig = require('./local.gulp-config');
  }
  catch (e) {}
  require('fourk-gulp')(gulp, localConfig);

})();
