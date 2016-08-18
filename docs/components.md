## Building components using Pattern Lab

- `source/_patterns/` - All components are filed here from smallest (atoms) to largest (pages). Each component contains it's own HTML (Twig) template as well as any related asset files (scss, js). It can also contain sample data (yml or json) as well as a documentation file for annotations (markdown).
- `source/_patterns/00-base` - This directory is for top-level needs such as sass variables/mixins, global javascript, etc.
- `images/icons/src/` - all SVGs here are combined into an SVG sprite. See `source/_patterns/01-atoms/04-images/icons.md` in Pattern Lab for instructions.
- `themes/fourk/dist/sassdoc/index.html` - Open this in a browser to see documentation on all Sass mixins thanks to [SassDoc](http://sassdoc.com).

### Resources

[Pattern Lab - Overview of Patterns](http://patternlab.io/docs/pattern-organization.html)
