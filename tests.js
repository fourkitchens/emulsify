var wdio = require("webdriverio");
var browser = wdio.remote({
  desiredCapabilities: {
    browserName: "chrome"
  }
}).init();

var excludes = [
  "#atoms-image img",
  ".card__img > img"
];

var hidden = [
  "#__bs_notify__"
];

require('webdrivercss').init(browser, {
  screenshotRoot: 'visreg',
  failedComparisonsRoot: 'visreg/diffs',
  misMatchTolerance: 0.05,
  screenWidth: [320,480,640,1024]
});

browser
  .url("http://localhost:3000/pattern-lab/public/styleguide/html/styleguide.html")
  .webdrivercss("full", [
    {
      name: "style-guide",
      exclude: excludes,
      hide: hidden,
      screenWidth: [320,640,1024]
    }, {
      name: "button-default",
      exclude: excludes,
      hide: hidden,
      elem: "#atoms-button > div.sg-pattern-example > button"
    }
  ])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-06-buttons/index.html")
  .webdrivercss("buttons", [
    {
      name: "button-default",
      exclude: excludes,
      hide: hidden,
      elem: ".button"
    }, {
      name: "button-alt",
      exclude: excludes,
      hide: hidden,
      elem: ".button--alt"
    }, {
      name: "button-alt-2",
      exclude: excludes,
      hide: hidden,
      elem: ".button--alt-2"
    }
  ])
  .end();
