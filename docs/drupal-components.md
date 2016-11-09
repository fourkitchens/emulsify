## Including Components in Drupal

From your Drupal Twig templates in `templates/` you can use Twig's `{% include %}`, `{% extends %}`, or `{% embed %}` statements to include your Pattern Lab Twig template files. Each of the top level folders has a Twig Namespace like `@organisms` (see emulsify.info.yml for the namespace conventions) and then you append the path down to the file like below.

`{% include "@organisms/path/to/file.twig" %}`

### Passing Variables

One of the biggest benefits of this component system is being able to give  concise, logical names to your variables. However, Drupal has it's own variable syntax that you will need to leverage to pass data. Below is an example from the page title template (`templates/page-title.html.twig`) of how to pass that data using Twig's `{% include %}` statement. Notice that the component uses a   `{{ heading }}` variable but the Drupal template uses `{{ title }}`. Simply pass the Drupal variable to the component variable as follows:

```
{% include "@atoms/02-text/00-headings/heading-1/heading-1.twig"
  with {
    "heading": title
  }
%}
```

Below is a more complex example:

```
{% include "@molecules/info-box/info-box.twig"
  with {
    "infobox_title": content.field_paragraph_info_box_label,
    "infobox_text": content.field_paragraph_info_box_text,
    "infobox_link": content.field_paragraph_info_box_link.0['#url']
  }
%}
```

### Drupal-specific functions, filters and tags

Drupal has specific Twig functions, filters, tags, etc. that it uses that Pattern Lab is not aware of. Pattern Lab has an easy way to add those though, which is in components/\_twig-components/. There are examples of filters and functions already in there (currently you can use the `t()` and `without()` filters and the `kint()` function). Documentation on how to add these can be found [here](https://github.com/pattern-lab/patternengine-php-twig#extending-twig-further).  

## JavaScript in Drupal

- Component-specific javascript should be written inside each component alongside the HTML/Twig and CSS. From there, add it [as a library](https://www.drupal.org/theme-guide/8/assets) in the theme and use Drupal's `attach_library` function to add the JS inside Drupal's Twig files (e.g., `{{ attach_library('emulsify/LIBRARY_NAME') }}`). That way, that javascript will only be loaded when needed.
- Javascript needed on _every_ page can be added in `components/_patterns/00-base/global/global.js`. This library is referenced by default in the emulsify.info.yml file, but should be used minimally.
- You can use [Drupal.behaviors](https://www.drupal.org/node/2269515) inside pattern lab, as the necessary javascript is being loaded in `components/_meta/_01-foot.twig`. See `components/_patterns/02-molecules/accordion-item/accordion-item.js` for an example usage.

### Resources
[Component-Driven Development in Drupal](https://www.fourkitchens.com/blog/article/component-based-theming-drupal-8-video-series)
