## Orientation

- `components/_patterns/` - All components are filed here from smallest (atoms) to largest (pages). Each component contains it's own Twig template as well as the asset files for that component. It may also contain sample data (yml/json) as well as a documentation file for annotations (markdown).
- `components/_patterns/00-base` - For top-level needs such as sass variables/mixins, global javascript, etc.
- `images/icons/src/` - any single SVGs here are automatically combined into an SVG sprite via a gulp task. See `components/_patterns/01-atoms/04-images/icons.md` in Pattern Lab for instructions.
- `dist/sassdoc/` - View this path in a browser to see documentation for all Sass mixins thanks to [SassDoc](http://sassdoc.com).

### CSS

This starterkit automatically compiles SCSS files from anywhere in the `components/_patterns` directory, so that you can organize your SCSS files right alongside your Twig files. There are a few things to keep in mind with this approach:

- Use the `_UNDERSCORE-FIRST.scss` syntax to make sure Sass files get compiled in the expected order.
- Default patterns use BEM syntax. While not required, an approach that keeps your CSS as modular as possible is highly recommended. By doing so, you "component-ize" your styles and the easier it will be to add/remove components without impacting the rest of the project.
- All pattern SCSS is imported into a single file `components/_patterns/style.scss` and compiled by the Gulp task into `dist/style.css`.

### JS

- All component javascript is concatenated into `dist/scripts-styleguide.js` for the sake of the styleguide.
- Other systems (including Drupal) should handle adding javascript more elegantly (see `docs/drupal-components.md` for Drupal instructions). That said, `components/_patterns/00-base/global/global.js` is copied directly into `dist/scripts.js` to be used as a global javascript file (should only be for global javascript).

### Pattern Lab

Components are automatically added to the Pattern Lab styleguide. We highly recommend reading through the [Pattern Lab documentation](http://patternlab.io/docs/pattern-organization.html), as it is quick and will speed up your process greatly. Here are some quick notes:

- Twig files starting with an underscore (e.g., `_block.twig`) are hidden from the Pattern Lab styleguide.
- You can include stock content in a `COMPONENT_NAME.yml` or `COMPONENT_NAME.json` file. See `components/_data/data.json` for default variables that can be used (or you can create your own).
- Pattern Lab also makes it easy to create lists as well. See `components/_patterns/01-atoms/03-lists/00-unordered.twig` for an example and `components/_data/listitems.json` for the stock variables that are available.
