## Building components using Pattern Lab

### Orientation

- `source/_patterns/` - All components are filed here from smallest (atoms) to largest (pages). Each component contains it's own HTML (Twig) template as well as any related asset files (scss, js). It can also contain sample data (yml or json) as well as a documentation file for annotations (markdown).
- `source/_patterns/00-base` - This directory is for top-level needs such as sass variables/mixins, global javascript, etc.
- `images/icons/src/` - all SVGs here are combined into an SVG sprite. See `source/_patterns/01-atoms/04-images/icons.md` in Pattern Lab for instructions.
- `themes/fourk/dist/sassdoc/index.html` - Open this in a browser to see documentation on all Sass mixins thanks to [SassDoc](http://sassdoc.com).

### CSS

This theme compiles SCSS files from anywhere in the `_patterns` directory, so that you can organize your SCSS files right alongside your HTML/Twig files. There are a few things to keep in mind with this approach:

- Use the `_FILENAME.scss` syntax to make sure Sass files get compiled correctly.
- The default patterns use BEM syntax. While not required, an approach that keeps your CSS as modular as possible is highly recommended. By doing so, you "component-ize" your CSS as well and the easier it will be to add/remove styles later without impacting existing styles.
- All pattern SCSS is compiled to a single style.css file in the `dist` directory.

### JS

- All component javascript is concatenated to a single scripts-styleguide.js file in the `dist` directory. This means all javascript is loaded in the styleguide.
- Other systems (including Drupal) have better ways of handling adding javascript to a page (see `docs/drupal-components.md` for Drupal instructions). That said, `source/_patterns/00-base/global/global.js` gets copied directly into `dist/scripts.js` so any javascript needed on every page in the system can be added here.

### Resources

[Pattern Lab - Overview of Patterns](http://patternlab.io/docs/pattern-organization.html)
