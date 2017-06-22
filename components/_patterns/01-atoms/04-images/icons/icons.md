---
title: Icons
---
### How to use icons

We are using a gulp SVG sprite generator, which automatically creates the SVG CSS in `_icon_sprite.scss`. Simply add separate SVG files into `images/icons/src/` and they will be added to the sprite the next time `gulp icons` is run.

**Writing Sass**

If you look in `_icon_sprite.scss`, you will notice there is a mixin and class for each sprite. You can use whatever approach suits your situation. **Note: You will need to tweak the background-size in 04-images/icons/_icons.scss each time a sprite is added.** You can also make use of the following mixins from `00-base/_mixins.scss` to provide inline icons before text:

```
.TEXT_WITH_ICON_BEFORE_IT {
  @include ICONNAME; // e.g., sprite-chevron-right
  @include with-icon;
}
```
