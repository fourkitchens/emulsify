---
title: Image (responsive support)
---
### Background
There are two key files for controlling the output of images. The first is `_image.twig` (basic `<img>` tag) and `responsive-image.twig`, which relies on the first file. You can include either depending on your need.

### Responsive (srcset)
As in the past, any image element can include the basic img tag attributes (src, alt, title) as well as the following responsive attributes: `img_srcset` and `img_sizes`. However, in order to use the srcset approach, you need to set `output_image_tag` to TRUE (see `themes/emulsify/components/_patterns/02-molecules/card/01-card.twig`) for an example.

### Responsive (picture)
If you don't set `output_image_tag`, then the responsive image usage will default to using the `<picture>` element.
