'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
var _ = {
  defaults: require('lodash/defaults')
};
// Globals
var gulp = global.gulp;
var config = global.config;
var browserSync = global.browserSync;

/*************************************************************
 * Operations
 ************************************************************/
gulp.task('serve', 'Launch BrowserSync and expected file watchers to serve PatternLab',
  ['compile', 'watch'],
  function () {
    if (config.browserSync.domain) {
      browserSync.init(_.defaults({
        injectChanges: true
      }, config.browserSync.defaults));
    }
    else {
      browserSync.init(_.defaults({
        injectChanges: true,
        server: {
          baseDir: config.browserSync.baseDir
        }
      }, config.browserSync.defaults));
    }
  }
);

/*************************************************************
 * Builders
 ************************************************************/
gulp.task('theme', '', ['serve']);

/*************************************************************
 * Watchers
 ************************************************************/
