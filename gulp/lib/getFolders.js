'use strict';
// From https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md

var fs          = require('fs'); //https://nodejs.org/api/fs.html
var path        = require('path');

module.exports = function (dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
  });
};
