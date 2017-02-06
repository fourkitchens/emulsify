'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Globals
var paths = global.paths;
global.config.images = {
  src: paths.img + '/**/*',
    dest: paths.dist_img,
    sizeReport: {
    enabled: false,
      options: {}
  }
};
