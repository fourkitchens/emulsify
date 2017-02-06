'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
var path = require('path');
var del = require('del');
var getFolders = require('../lib/getFolders');
var merge = require('merge-stream');
// Globals
var gulp = global.gulp;
var config = global.config;

var tasks = global.tasks;
var browserSync = global.browserSync;

/*************************************************************
 * Operations
 ************************************************************/
gulp.task('svg:icons', 'Build a full scss mixin & sprite file based on all available svg icons',
  function () {
    return gulp.src(config.svg.src)
      .pipe(gulp.$.svgSprite(config.svg.iconConfig))
      .pipe(gulp.dest(config.svg.dest));
  }
);

gulp.task('svg:delete', 'Step 1 - Delete the SVG destination folder\'s contents',
  function () {
    // Delete all files except warning file to not save Svg in destination
    var deletePattern = [
      config.svg.dest + '/**/*',
      '!' + config.svg.dest + '/do-not-save-files-here.md'
    ];
    return del(deletePattern);
  }
);

gulp.task('svg:minify', 'Step 2 - Minfify, Remove all Strokes & Fills, and copy to new location',
  ['svg:delete'],
  function () {
    return gulp.src(config.svg.src)
      .pipe(gulp.$.imagemin(config.svg.removeAttrs))
      .pipe(gulp.dest(config.svg.dest) // write all the minified svg to dest.
      );
  }
);

gulp.task('svg:minify:keepAttributes', 'Step 3 - Minfify (Leaving Strokes & Fills) and copy to new location',
  ['svg:minify'],
  function () {
    return gulp.src(config.svg.keepAttributesSrc)
      .pipe(gulp.$.imagemin(config.svg.keepAttrs))
      .pipe(gulp.dest(config.svg.dest) // write all the minified svg to dest.
      );
  }
);

gulp.task('svg:createSprites', 'Step 4 - Sprite Minfied files',
  ['svg:minify:keepAttributes'],
  function () {
    // Each sub-folder's content becomes a single SVG sprite in the root dest folder
    // Get the folders in the dest
    var spriteFolders = getFolders(config.svg.dest);

    // Contents of each folder will get converted to a single sprite
    // spriteFolders.map - executes the function once per folder, and returns the async stream
    var buildSprites = spriteFolders.map(function (folder) {

      var spriteSrc = path.join(config.svg.dest, folder, '/**/*.svg');

      return gulp.src(spriteSrc)
        .pipe(gulp.$.svgstore())
        .pipe(gulp.dest(config.svg.dest));
    });

    return merge(buildSprites); // Wait for all stream emitters to end then return
  }
);

gulp.task('svg:sprite', 'Step 5 - Export SVGz gzipped files for better compression the server side gzip',
  ['svg:createSprites'],
  function () {
    // Test to make sure they're not too big
    return gulp.src(config.svg.dest + '/*.svg')
      .pipe(gulp.$.rename(function (path) {
        path.extname = ''; // Trim Extension
      }))
      .pipe(gulp.$.gzip({extension: config.svg.gzipFormat})) // Gzip and add "svgz" extension
      .pipe(gulp.dest(config.svg.dest))
      .pipe(gulp.$.if(config.svg.sizeReport.enabled,
        gulp.$.sizereport(config.svg.sizeReport.options)
        )
      );
  }
);

/*************************************************************
 * Builders
 ************************************************************/
gulp.task('svg', 'Execute all SVG related tasks', ['svg:icons', 'svg:sprite']);
tasks.compile.push('svg');

/*************************************************************
 * Watchers
 ************************************************************/
if (config.svg.watcher) { // If enabled, watch for changes on SVGs
  gulp.watch([config.svg.src], '', ['svg'], browserSync.reload);
}
