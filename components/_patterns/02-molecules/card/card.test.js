const visreg = require('../../../../tests/visual/visreg-init');

visreg.init();

visreg.browser
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-card/index.html")
  .webdrivercss("cards", [
    {
      name: "card",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".card"
    }, {
      name: "card-bg",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".card--bg"
    }])
