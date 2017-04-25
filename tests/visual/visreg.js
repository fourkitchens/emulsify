const visreg = require('./visreg-init');

visreg.init();

visreg.browser
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-01-links/index.html")
  .webdrivercss("links", [
    {
      name: "links",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".link--more-link"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-02-text/index.html")
  .webdrivercss("text", [
    {
      name: "heading-1",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".heading-1"
    },
    {
      name: "heading-1-linked",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".heading-1__link"
    },
    {
      name: "heading-2",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".heading-2"
    },
    {
      name: "heading-3",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".heading-3"
    },
    {
      name: "heading-4",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".heading-4"
    },
    {
      name: "heading-5",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".heading-5"
    },
    {
      name: "heading-6",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".heading-6"
    },
    {
      name: "paragraph",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".paragraph"
    },
    {
      name: "blockquote",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".blockquote"
    },
    {
      name: "inline-elements",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".text"
    },
    {
      name: "horizontal-rule",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".hr"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-03-lists/index.html")
  .webdrivercss("lists", [
    {
      name: "list-unordered",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".list-ul"
    },
    {
      name: "list-ordered",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".list-ol"
    },
    {
      name: "list-definition",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".list-dl"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-04-images/index.html")
  .webdrivercss("images", [
    {
      name: "image",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".image"
    }, {
      name: "logo",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".logo__image"
    }, {
      name: "icons",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: "#atoms-icons"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-05-forms/index.html")
  .webdrivercss("forms", [
    {
      name: "checkboxes",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".form-item--checkbox"
    }, {
      name: "radios",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".form-item--radio"
    }, {
      name: "select",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: "#atoms-select"
    }, {
      name: "text-fields",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: "#atoms-textfields"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-06-buttons/index.html")
  .webdrivercss("buttons", [
    {
      name: "button-default",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".button"
    }, {
      name: "button-alt",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".button--alt"
    }, {
      name: "button-alt-2",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".button--alt-2"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-07-tables/index.html")
  .webdrivercss("tables", [
    {
      name: "table",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".table"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-08-video/index.html")
  .webdrivercss("videos", [
    {
      name: "video-wide",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".video"
    }, {
      name: "video-full",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".video--full"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/01-atoms-09-menu/index.html")
  .webdrivercss("menus", [
    {
      name: "tab",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".tabs__nav"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-accordion-item/index.html")
  .webdrivercss("accordion", [
    {
      name: "accordion-item",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".accordion__list-dl"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-info-box/index.html")
  .webdrivercss("info-box", [
    {
      name: "info-box",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".info-box"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-menus/index.html")
  .webdrivercss("menus", [
    {
      name: "breadcrumbs",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".breadcrumb"
    }, {
      name: "tabs",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".tabs"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-pager/index.html")
  .webdrivercss("pager", [
    {
      name: "pager",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".pager__items"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-status/index.html")
  .webdrivercss("status", [
    {
      name: "status",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: "#molecules-status .sg-pattern-example"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/03-organisms-accordion/index.html")
  .webdrivercss("accordion", [
    {
      name: "accordion",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".accordion__list-dl"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/03-organisms-card-grid/index.html")
  .webdrivercss("card-grid", [
    {
      name: "card-grid",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: "#organisms-card-grid .sg-pattern-example"
    }, {
      name: "card-grid-alt",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: "#organisms-card-grid-alt .sg-pattern-example"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/03-organisms-info-box-grid/index.html")
  .webdrivercss("info-box-grid", [
    {
      name: "info-box-grid",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: ".grid"
    }])
  .url("http://localhost:3000/pattern-lab/public/patterns/02-molecules-status/index.html")
  .webdrivercss("status", [
    {
      name: "status",
      exclude: visreg.excludes,
      hide: visreg.hidden,
      elem: "#molecules-status .sg-pattern-example"
    }])
  .end();
