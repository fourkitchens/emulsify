---
title: Icons
---
### How to use icons

We are using a gulp SVG sprite generator, which automatically creates the SVG CSS in `/scss/00-config/_icon-sprite.scss`. Simply add separate SVG files into `images/icons/src/` and they will be added to the sprite the next time `npm start` is run. Feel free to place any generic icon styling in `/scss/00-config/_icons.scss`.

**Writing Sass**

If you look in `/scss/00-config/_icon-sprite.scss`, you will notice there is a mixin and class for each sprite. You can use whatever approach suits your situation. You should also use following mixins (from `themes/custom/nyunursing/scss/00-config/_utilities.scss` to provide inline icons before text:

```
.TEXT_WITH_ICON_BEFORE_IT {
  @include ICONNAME; // e.g., sprite-chevron-right
  @include with-icon;
}

.TEXT_WITH_COLOR_BACKGROUND_ICON_BEFORE_IT {
  @include ICONNAME; // e.g., sprite-chevron-right-white
  @include with-icon;
  @include icon-bg(COLOR); // color optional
}
```
