'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Local
var localUrl = 'mainspring.dev'; // EG 'localhost', 'mysite.dev'
// Globals
var paths = global.paths;
global.config.browserSync = {
  ui: true,
  enabled: true,
  baseDir: './',
  defaults: {
    startPath: 'pattern-lab/public/',
    open: false,
    browser: "google chrome",
    reloadDelay: 50,
    reloadDebounce: 750
    // Uncomment below if using a specific local url
    // ,proxy: localUrl
  }
};
global.config.wpt = {
  // WebPageTest API key https://www.webpagetest.org/getkey.php
  // key:
};
