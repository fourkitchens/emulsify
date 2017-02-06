'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Local
var themeDir = process.cwd() + '/';
// Global
global.paths = {
  themeDir: themeDir,
  js: themeDir + '/components/_patterns/**/*.js',
  sass: themeDir,
  img: themeDir + '/images',
  dist_js: themeDir + '/dist',
  dist_css: themeDir + '/dist/css',
  dist_img: themeDir + '/dist/img',
  dist_svg: themeDir + '/svg'
};
