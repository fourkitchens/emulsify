---
title: Icons
---

### How to use icons

We are using a gulp SVG sprite generator (details [here](https://una.im/svg-icons)), which automatically takes individual SVGs from `/images/icons/src` and generates `/dist/img/sprite/sprite.svg`. Simply run `gulp icons` to add your individual SVGs to this sprite.

**Usage**

The SVG component is found here: `/components/_patterns/01-atoms/04-images/icons/_icon.twig`. See available variables in that file as well as instructions for Drupal. Examples of usage below:

Simple: (no BEM renaming)

```
{% include "@atoms/04-images/icons/_icon.twig" with {
  icon_name: 'bars',
} %}
```

... creates...

```
<svg class="icon" role="img" aria-labelledby="title-bars">
  <title id="title-bars">bars</title>
  <use xlink:href="/images/sprite/sprite.svg#src--bars"></use>
</svg>
```

Complex (BEM classes):

```
{% include "@atoms/04-images/icons/_icon.twig" with {
  icon_base_class: 'icon',
  icon_blockname: 'toggle-expand',
  icon_name: 'bars',
  icon_title: "Menu",
  icon_desc: "Open Menu",
  hidden: TRUE,
} %}
```

... creates...

```
<svg class="toggle-expand__icon" role="img" aria-hidden="true" aria-labelledby="title-bars desc-bars" aria-describedby="desc-bars">
  <title id="title-bars">Menu</title>
  <desc id="desc-bars">Open Menu</desc>
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/sprite/sprite.svg#src--bars"></use>
</svg>
```

**A Note on Accessibility**
We are trying to make the SVG icons as accessible as possible. By default, a `<title>` element is created and populated with the name of the icon. You can (and probably should) pass a better title to the `icon_title` variable (like we do above by passing "Menu"). You can also pass a description to `icon_desc` if need be. If the element needs to be hidden because it is merely decoration accompanying a more descriptive element, you can add `hidden: TRUE` (adds `aria-hidden="true"` to the SVG). The role of `img` is added by default, but you can override that by passing a value to `icon_role`. For more information on how/when to use these and more, see [https://css-tricks.com/accessible-svgs/](https://css-tricks.com/accessible-svgs/).
