---
title: Icons
---
### How to use icons

We are using a gulp SVG sprite generator (details [here](https://una.im/svg-icons)), which automatically creates the SVG in `/images/icons/sprite/sprite.svg`. Simply run `gulp icons` to add to the sprite.

**Usage**

The SVG component is found here: `/components/_patterns/01-atoms/04-images/icons/_icon.twig`. See available variables in that file. Examples of usage below:

Simple: (no BEM renaming)

```
{% include "@atoms/04-images/icons/_icon.twig" with {
  icon_name: 'bars',
} %}
```

... creates...

```
<svg class="icon">
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/sprite/sprite.svg#src--bars"></use>
</svg>
```

Complex (BEM classes):

```
{% include "@atoms/04-images/icons/_icon.twig" with {
  icon_base_class: 'icon',
  icon_blockname: 'toggle-expand',
  icon_name: 'bars',
} %}
```

... creates...

```
<svg class="toggle-expand__icon">
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/sprite/sprite.svg#src--bars"></use>
</svg>
```
