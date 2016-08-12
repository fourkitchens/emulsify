---
title: Icons
---
### How to use icons

We are using a gulp SVG sprite generator, which automatically creates the SVG CSS in `/source/_patterns//01-atoms/04-images/icons/_icon-sprite.scss`. Simply add separate SVG files into `images/icons/src/` and they will be added to the sprite the next time `npm start` is run. Place any generic icon styling in `/source/_patterns//01-atoms/04-images/icons/_icons.scss`.

### Adding icons

To add a new icon, simply add the SVG icon into `images/icons/src` and run the `gulp icons` task (this task is also run during `npm start`). To add an example into Pattern Lab, simply add the icon name into `source/_patterns/01-atoms/04-images/icons/icons.yml` following the example syntax.

**Writing Sass**

If you look in `/source/_patterns//01-atoms/04-images/icons/_icon-sprite.scss`, you will notice there is a mixin and class for each sprite. Use whatever approach best fits your situation. You should also use following mixins (from `source/_patterns/00-base/_mixins.scss` to provide inline icons before text:

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
