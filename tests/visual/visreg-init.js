const WDIO = require("webdriverio");

module.exports = {
  browser: WDIO.remote({
    desiredCapabilities: {
      browserName: "chrome"
    }
  }).init(),
  init: function() {
    require('webdrivercss').init(this.browser, {
      screenshotRoot: 'tests/visual/images',
      failedComparisonsRoot: 'tests/visual/images/diffs',
      misMatchTolerance: 0.6,
      screenWidth: [320,720,1280]
    });
  },
  excludes: [
    "img"
  ],
  hidden: [
    "#__bs_notify__"
  ]
};
