const WDIO = require("webdriverio");
var browser = WDIO.remote({
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
  screenshotRoot: 'tests/visual/images',
  failedComparisonsRoot: 'tests/visual/images/diffs',
  misMatchTolerance: 0.6,
  screenWidth: [320,720,1280]
});

browser
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-01-links/index.html")
  .webdrivercss("links", [
    {
      name: "links",
      exclude: excludes,
      hide: hidden,
      elem: ".link--more-link"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-02-text/index.html")
  .webdrivercss("text", [
    {
      name: "heading-1",
      exclude: excludes,
      hide: hidden,
      elem: ".heading-1"
    },
    {
      name: "heading-1-linked",
      exclude: excludes,
      hide: hidden,
      elem: ".heading-1__link"
    },
    {
      name: "heading-2",
      exclude: excludes,
      hide: hidden,
      elem: ".heading-2"
    },
    {
      name: "heading-3",
      exclude: excludes,
      hide: hidden,
      elem: ".heading-3"
    },
    {
      name: "heading-4",
      exclude: excludes,
      hide: hidden,
      elem: ".heading-4"
    },
    {
      name: "heading-5",
      exclude: excludes,
      hide: hidden,
      elem: ".heading-5"
    },
    {
      name: "heading-6",
      exclude: excludes,
      hide: hidden,
      elem: ".heading-6"
    },
    {
      name: "paragraph",
      exclude: excludes,
      hide: hidden,
      elem: ".paragraph"
    },
    {
      name: "blockquote",
      exclude: excludes,
      hide: hidden,
      elem: ".blockquote"
    },
    {
      name: "inline-elements",
      exclude: excludes,
      hide: hidden,
      elem: ".text"
    },
    {
      name: "horizontal-rule",
      exclude: excludes,
      hide: hidden,
      elem: ".hr"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-03-lists/index.html")
  .webdrivercss("lists", [
    {
      name: "list-unordered",
      excludes: excludes,
      hide: hidden,
      elem: ".list-ul"
    },
    {
      name: "list-ordered",
      excludes: excludes,
      hide: hidden,
      elem: ".list-ol"
    },
    {
      name: "list-definition",
      excludes: excludes,
      hide: hidden,
      elem: ".list-dl"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-04-images/index.html")
  .webdrivercss("images", [
    {
      name: "image",
      exclude: excludes,
      hide: hidden,
      elem: ".image"
    }, {
      name: "logo",
      exclude: excludes,
      hide: hidden,
      elem: ".logo__image"
    }, {
      name: "icons",
      exclude: excludes,
      hide: hidden,
      elem: "#atoms-icons"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-05-forms/index.html")
  .webdrivercss("forms", [
    {
      name: "checkboxes",
      exclude: excludes,
      hide: hidden,
      elem: ".form-item--checkbox"
    }, {
      name: "radios",
      exclude: excludes,
      hide: hidden,
      elem: ".form-item--radio"
    }, {
      name: "select",
      exclude: excludes,
      hide: hidden,
      elem: "#atoms-select"
    }, {
      name: "text-fields",
      exclude: excludes,
      hide: hidden,
      elem: "#atoms-textfields"
    }])
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
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-07-tables/index.html")
  .webdrivercss("tables", [
    {
      name: "table",
      exclude: excludes,
      hide: hidden,
      elem: ".table"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-08-video/index.html")
  .webdrivercss("videos", [
    {
      name: "video-wide",
      exclude: excludes,
      hide: hidden,
      elem: ".video"
    }, {
      name: "video-full",
      exclude: excludes,
      hide: hidden,
      elem: ".video--full"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-09-menu/index.html")
  .webdrivercss("menus", [
    {
      name: "tab",
      exclude: excludes,
      hide: hidden,
      elem: ".tabs__nav"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-accordion-item/index.html")
  .webdrivercss("accordion", [
    {
      name: "accordion-item",
      exclude: excludes,
      hide: hidden,
      elem: ".accordion__list-dl"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-card/index.html")
  .webdrivercss("cards", [
    {
      name: "card",
      exclude: excludes,
      hide: hidden,
      elem: ".card"
    }, {
      name: "card-bg",
      exclude: excludes,
      hide: hidden,
      elem: ".card--bg"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-info-box/index.html")
  .webdrivercss("info-box", [
    {
      name: "info-box",
      exclude: excludes,
      hide: hidden,
      elem: ".info-box"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-menus/index.html")
  .webdrivercss("menus", [
    {
      name: "breadcrumbs",
      exclude: excludes,
      hide: hidden,
      elem: ".breadcrumb"
    }, {
      name: "tabs",
      exclude: excludes,
      hide: hidden,
      elem: ".tabs"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-pager/index.html")
  .webdrivercss("pager", [
    {
      name: "pager",
      exclude: excludes,
      hide: hidden,
      elem: ".pager__items"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-status/index.html")
  .webdrivercss("status", [
    {
      name: "status",
      exclude: excludes,
      hide: hidden,
      elem: "#molecules-status .sg-pattern-example"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/03-organisms-accordion/index.html")
  .webdrivercss("accordion", [
    {
      name: "accordion",
      exclude: excludes,
      hide: hidden,
      elem: ".accordion__list-dl"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/03-organisms-card-grid/index.html")
  .webdrivercss("card-grid", [
    {
      name: "card-grid",
      exclude: excludes,
      hide: hidden,
      elem: "#organisms-card-grid .sg-pattern-example"
    }, {
      name: "card-grid-alt",
      exclude: excludes,
      hide: hidden,
      elem: "#organisms-card-grid-alt .sg-pattern-example"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/03-organisms-info-box-grid/index.html")
  .webdrivercss("info-box-grid", [
    {
      name: "info-box-grid",
      exclude: excludes,
      hide: hidden,
      elem: ".grid"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-status/index.html")
  .webdrivercss("status", [
    {
      name: "status",
      exclude: excludes,
      hide: hidden,
      elem: "#molecules-status .sg-pattern-example"
    }])
  .end();
