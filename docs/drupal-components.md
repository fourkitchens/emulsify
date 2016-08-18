## Including Components in Drupal

From your Drupal Twig templates in `templates/` you can use Twig's `{% include %}`, `{% extends %}`, or `{% embed %}` statements to include your Pattern Lab Twig template files. Each of the top level folders has a Twig Namespace like `@organisms` (see fourk.info.yml for the namespace conventions) and then you append the path down to the file like below.

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
