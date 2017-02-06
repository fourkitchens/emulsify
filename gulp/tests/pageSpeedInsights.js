'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
//// Performance Testing
var ngrok = require('ngrok');
var psi = require('psi');
// Globals
var gulp = global.gulp;
var config = global.config;

var tasks = global.tasks;
var browserSync = global.browserSync;

// -----------------------------------------------------------------------------
// Performance test: PageSpeed Insights
//
// Initializes a public tunnel so the PageSpeed service can access your local
// site, then it tests the site. This task outputs the standard PageSpeed results.
//
// The task will output a standard exit code based on the result of the PSI test
// results. 0 is success and any other number is a failure. To learn more about
// bash-compatible exit status codes read this page:
//
// http://tldp.org/LDP/abs/html/exit-status.html
// -----------------------------------------------------------------------------
gulp.task('pageSpeedInsights', 'Performance: PageSpeed Insights', function () {
  // Set up a public tunnel so PageSpeed can see the local site.
  return ngrok.connect(4000, function (err_ngrok, url) {
    console.log('ngrok - serving your site from ' + url);

    // Run PageSpeed once the tunnel is up.
    psi.output(url, {
      strategy: 'mobile',
      threshold: 90
    }, function (err_psi, data) {
      // Log any potential errors and return a FAILURE.
      if (err_psi) {
        console.log(err_psi);
        process.exit(1);
      }

      // Kill the ngrok tunnel and return SUCCESS.
      process.exit(0);
    });
  });
});

tasks.test.push('pageSpeedInsights');
