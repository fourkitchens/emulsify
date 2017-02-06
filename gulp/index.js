'use strict';

// Globals
var gulp = global.gulp = require('gulp-help')(require('gulp'));
gulp.$ = require('gulp-load-plugins')();
var browserSync = global.browserSync = require('browser-sync').create();
var tasks = global.tasks = {
  compile: [],
  watch: [],
  validate: [],
  clean: [],
  test: []
};
// Modules
var requireDir = require('require-dir');
var runSequence = require('run-sequence').use(gulp);
// Helpers
var _ = {
  defaults: require('lodash/defaults')
};

requireDir('./tasks');
requireDir('./tests');

/**
 * Global Tasks
 */
gulp.task('compile','Runs all required compile tasks', tasks.compile);
gulp.task('clean', 'Runs all required clean tasks', tasks.clean);
gulp.task('validate', 'Runs all validation tasks, no exceptions', tasks.validate);
gulp.task('watch', 'Runs default watches across the board', tasks.watch);
gulp.task('test', 'Run all quality checks and tests.', tasks.test);
gulp.task('default', '', function () {
  runSequence('clean','theme');
});
gulp.task('build', '', ['compile']);
