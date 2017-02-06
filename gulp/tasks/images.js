'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
//
// Globals
var gulp = global.gulp;
var config = global.config;

var tasks = global.tasks;
var browserSync = global.browserSync;

/*************************************************************
 * Operations
 ************************************************************/
gulp.task('images', 'Attempt to run compression on image assets', function () {
  return gulp.src(config.images.src)
    .pipe(gulp.$.plumber({
      errorHandler: gulp.$.notify.onError('Error: <%= error.message %>')
    }))

    .pipe(gulp.$.imagemin({
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ]
    }))
    .pipe(gulp.dest(config.images.dest))
    .pipe(browserSync.reload({stream: true})
      // Image Size Reporting
        .pipe(gulp.$.if(config.images.sizeReport.enabled,
          gulp.$.sizereport(config.images.sizeReport.options)
        ))
    );
});

/*************************************************************
 * Builders
 ************************************************************/
tasks.compile.push('images');

/*************************************************************
 * Watchers
 ************************************************************/
