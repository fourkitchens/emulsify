/* globals require */

(function () {
  'use strict';

  // General
  var gulp = require('gulp-help')(require('gulp'));
  var localConfig = {};

  try {
    localConfig = require('./local.gulp-config');
  }
  catch (e) {
    // Do nothing.
  }
  require('emulsify-gulp')(gulp, localConfig);

})();
