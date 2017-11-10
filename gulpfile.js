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
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }
  }
  require('emulsify-gulp')(gulp, localConfig);

  /**
   * Move fonts into dist/.
   */
  gulp.task('move-fonts', () => {
    gulp.src(localConfig.paths.fonts + '/**/*')
    .pipe(gulp.dest(localConfig.paths.dist_fonts))
  })

})();
