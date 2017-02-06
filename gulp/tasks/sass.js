'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
var del = require('del');
var sassdoc = require('sassdoc');
var normalizeScss = require('node-normalize-scss');
// Globals
var gulp = global.gulp;
var config = global.config;

var tasks = global.tasks;
var browserSync = global.browserSync;

/*************************************************************
 * Operations
 ************************************************************/
gulp.task('sass:compile', 'Compile Scss to CSS using Libsass with Autoprefixer and SourceMaps', function () {
  return gulp.src(config.sass.src)
    .pipe(gulp.$.sassGlob())
    .pipe(gulp.$.plumber({
      errorHandler: function (error) {
        gulp.$.notify.onError({
          title: 'CSS <%= error.name %> - Line <%= error.line %>',
          message: '<%= error.message %>'
        })(error);
        this.emit('end');
      }
    }))
    .pipe(gulp.$.sourcemaps.init({
      debug: config.debug
    }))
    .pipe(gulp.$.sass({
      outputStyle: config.sass.outputStyle,
      sourceComments: config.sass.sourceComments,
      includePaths: normalizeScss.with(config.sass.includePaths)
    }).on('error', gulp.$.sass.logError))
    .pipe(gulp.$.autoprefixer(['last 1 version', '> 1%', 'ie 10']))
    .pipe(gulp.$.sourcemaps.init())
    .pipe(gulp.$.cleanCss())
    .pipe(gulp.$.sourcemaps.write((config.sass.sourceMapEmbed) ? null : './'))
    .pipe(gulp.$.if(config.sass.flattenDestOutput, gulp.$.flatten()))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(gulp.$.if(config.sass.sizeReport.enabled,
      gulp.$.sizereport(config.sass.sizeReport.options)
    ))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('sass:clean', 'Delete compiled CSS files', function (done) {
  del([
    config.sass.dest + '*.{css,css.map}'
  ]).then(function () {
    done();
  });
});

gulp.task('sass:lint', 'Lint Scss files', function () {
  var src = config.sass.src;
  if (config.sass.lint.extraSrc) {
    src = src.concat(config.sass.lint.extraSrc);
  }
  return gulp.src(src)
    .pipe(gulp.$.cached('validate:css'))
    .pipe(gulp.$.sassLint())
    .pipe(gulp.$.sassLint.format())
    .pipe(gulp.$.if(config.sass.lint.failOnError, gulp.$.sassLint.failOnError()));
});

gulp.task('sass:docs', 'Build CSS docs using SassDoc', function () {
  return gulp.src(config.sass.src)
    .pipe(sassdoc({
      dest: config.sass.docs.dest,
      verbose: config.sass.docs.verbose,
      basePath: config.sass.docs.basePath,
      exclude: config.sass.docs.exclude,
      theme: config.sass.docs.theme,
      sort: config.sass.docs.sort
    }));
});

gulp.task('sass:docs:clean', 'Delete compiled CSS docs', function (done) {
  del([
    config.sass.docs.dest
  ]).then(function () {
    done();
  });
});

/*************************************************************
 * Builders
 ************************************************************/
var sassTasks = ['sass:compile'];
if (config.sass.lint.enabled) {
  sassTasks.push('sass:lint');
}
if (config.sass.docs.enabled) {
  sassTasks.push('sass:docs');
  tasks.clean.push('sass:docs:clean');
}

gulp.task('sass', 'Execute all configured Sass actions (compile, optional lint/sourcemaps based on config)', sassTasks);
tasks.compile.push('sass');
tasks.clean.push('sass:clean');
tasks.validate.push('sass:lint');

/*************************************************************
 * Watchers
 ************************************************************/
gulp.task('sass:watch', function () {
  return gulp.watch(config.sass.src, sassTasks);
});
tasks.watch.push('sass:watch');
