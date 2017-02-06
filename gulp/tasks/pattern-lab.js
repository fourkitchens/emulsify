/* globals require, process, global, console */

/*************************************************************
 * Variables
 ************************************************************/
// Modules
var sh = require('../lib/shell');
var path = require('path');
var yaml = require('js-yaml');
yaml.merge = require('yaml-merge').mergeFiles;
var fs = require('fs');
var _ = {
  debounce: require('lodash/debounce'),
  filter: require('lodash/filter'),
  map: require('lodash/map'),
  startsWith: require('lodash/startsWith'),
};
// Globals
var gulp = global.gulp;
var config = global.config;
// var paths = global.paths;

var tasks = global.tasks;
var browserSync = global.browserSync;
// Local
var plConfig = yaml.safeLoad(
  fs.readFileSync(config.patternLab.configFile, 'utf8')
);
var plRoot = path.join(config.patternLab.configFile, '../..');
var plSource = path.join(plRoot, plConfig.sourceDir);
// var plPublic = path.join(plRoot, plConfig.publicDir);
// var plMeta = path.join(plSource, '/_meta');
var consolePath = path.join(plRoot, 'core/console');

/*************************************************************
 * Operations
 ************************************************************/
function plBuild(cb) {
  sh('php ' + consolePath + ' ' + '--generate', true, function () {
    if (config.browserSync.enabled) {
      browserSync.reload();
      // console.log("==> BrowserSync Reloading... plBuild");
    }
    cb();
  });
}

gulp.task('pl', 'Compile Pattern Lab', plBuild);

gulp.task('pl:dev', _.debounce(function () {
}, config.browserSync.reloadDebounce));

var watchedExtensions = config.patternLab.watchedExtensions.join(',');
gulp.task('pl:watch', function () {
  var plGlob = path.normalize(plSource + '/**/*.{' + watchedExtensions + '}');
  gulp.watch(plGlob, function (event) {
    var relativePath = path.relative(process.cwd(), event.path);
    console.log('File ' + relativePath + ' was ' + event.type + ', loading...');
    sh('php ' + consolePath + ' ' + '--generate', false, function () {
      if (config.browserSync.enabled) {
        browserSync.reload();
      }
    });
  });
});

var plFullDependencies = [];

if (config.patternLab.scssToJson) {
  // turns scss files full of variables into json files that PL can iterate on
  gulp.task('pl:scss-to-json', function (done) {
    console.log(config.patternLab.scssToJson);
    config.patternLab.scssToJson.forEach(function (pair) {
      var tempalteFile = fs.readFileSync(pair.src, 'utf8').split('\n');
      var scssVarList = _.filter(tempalteFile, function (item) {
        return _.startsWith(item, pair.lineStartsWith);
      });
      // console.log(scssVarList, item.src);
      var varsAndValues = _.map(scssVarList, function (item) {
        var x = item.split(':');
        return {
          name: x[0].trim(), // i.e. $color-gray
          value: x[1].replace(/;.*/, '').trim(), // i.e. hsl(0, 0%, 50%)
        };
      });

      if (!pair.allowVarValues) {
        varsAndValues = _.filter(varsAndValues, function (item) {
          return !_.startsWith(item.value, '$');
        });
      }

      fs.writeFileSync(pair.dest, JSON.stringify({
        items: varsAndValues,
        meta: {
// eslint-disable-next-line max-len
          description: 'To add to these items, use Sass variables that start with <code>' + pair.lineStartsWith + '</code> in <code>' + pair.src + '</code>',
        },
      }, null, '  '));
    });
    done();
  });
  plFullDependencies.push('pl:scss-to-json');

  gulp.task('pl:scss-to-json:watch', function () {
    var files = config.patternLab.scssToJson.map(function (file) {
      return file.src;
    });
    gulp.watch(files, ['pl:scss-to-json']);
  });
  tasks.watch.push('pl:scss-to-json:watch');
}

gulp.task('pl:config', '', function () {
  var plConfigFile = './pattern-lab/config/config.yml';
  var localConfigFile = './.pattern-lab.config.yml';
  var plConfig = yaml.merge([
    plConfigFile,
    localConfigFile,
  ]);

  console.log('PL Config: Loading', plConfigFile);
  console.log('PL Config: Overriding with', localConfigFile);

  try {
    var dumpOpts = {
      lineWidth: 1000,
      indent: 4,
    };
    var outputYml = yaml.safeDump(plConfig, dumpOpts);

    fs.writeFile(plConfigFile, outputYml, function (err) {
      if (err) {
        throw err;
      }
      console.log('It\'s saved!');
    });
  } catch (e) {
  }
});

/*************************************************************
 * Builders
 ************************************************************/
gulp.task('pl:full', false, plFullDependencies, plBuild);
tasks.compile.push('pl:full');

/*************************************************************
 * Watchers
 ************************************************************/
tasks.watch.push('pl:watch');
