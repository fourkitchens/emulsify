'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Globals
var paths = global.paths;
global.config.js = {
  src: [
    paths.js,
    paths.js_globals
  ],
  dest: paths.themeDir + '/dist/',
  sourceMapEmbed: true,
  hint: {
    enabled: false,
    src: [
      paths.js
    ]
  },
  lint: {
    enabled: false,
    src: [
      paths.js
    ],
    options: {
      path: paths.themeDir + '.eslint.js'
    }
  },
  sizeReport: {
    enabled: false,
    options: {
      '*': {
        'maxSize': 200000 // Alert if > Max Size in Bytes after gzip
      }
    }
  }
};
