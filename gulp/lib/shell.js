/* globals require, process, global, module */

/*************************************************************
 * Variables
 ************************************************************/
// Modules
var exec = require('child_process').exec;
// Globals
var gulp = global.gulp;


function sh(cmd, exitOnError, cb) {
  var child = exec(cmd, {encoding: 'utf8'});
  var stdout = '';
  var stderr = '';
  child.stdout.on('data', function (data) {
    stdout += data;
    process.stdout.write(data);
  });
  child.stderr.on('data', function (data) {
    stderr += data;
    process.stdout.write(data);
  });
  child.on('close', function (code) {
    if (code > 0) {
      console.log('Error with code ' + code + ' after running: ' + cmd);
      if (exitOnError) {
        process.exit(code);
      }
      else {
        gulp.$.notify({
          title: cmd,
          message: stdout,
          sound: true,
        });
      }
    }
    cb();
  });
}

module.exports = sh;
