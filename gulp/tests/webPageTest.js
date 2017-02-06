'use strict';

/*************************************************************
 * Variables
 ************************************************************/
// Modules
//// Performance Testing
var ngrok = require('ngrok');
var wpt = require('webpagetest');
// Globals
var gulp = global.gulp;
var config = global.config;

var tasks = global.tasks;
var browserSync = global.browserSync;

// -----------------------------------------------------------------------------
// Performance test: WebPageTest.org
//
// Initializes a public tunnel so the PageSpeed service can access your local
// site, then it tests the site. This task outputs the standard PageSpeed results.
// -----------------------------------------------------------------------------
gulp.task('webPageTest', 'Performance: WebPageTest.org', function () {
  if (!config.webPageTest.key) {
    return console.log('Missing webPageTest key env variable.');
  }
  var wpt_test = wpt('www.webpagetest.org', config.wpt.key);

  // Set up a public tunnel so WebPageTest can see the local site.
  return ngrok.connect(4000, function (err_ngrok, url) {
    console.log('ngrok - serving your site from ' + url);

    // The `url` variable was supplied by ngrok.
    wpt_test.runTest(url, function (err_wpt, data_wpt) {
      // Log any potential errors and return a FAILURE.
      if (err_wpt) {
        console.log(err_wpt);
        process.exit(1);
      }

      // Open window to results.
      var wpt_results = 'http://www.webpagetest.org/result/' + data_wpt.data.testId;
      console.log('✔︎  Opening results page: ' + wpt_results);

      // Note to developer.
      console.log('⚠️  Please keep this process running until WPT is finished.');
      console.log('⚠️  Once the results load, hit Control + C to kill this process.');
    });
  });
});

tasks.test.push('webPageTest');
