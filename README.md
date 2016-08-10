This theme uses a reusable component approach with an automated styleguide using [Pattern Lab](http://patternlab.io/). Instructions for installing and building inside of the theme can be found below:

## Installation

    npm install
    npm start

## Orientation

- `source/_patterns/` - The majority of Frontend work will be done here. The directory contains all component twig templates, Sass files, documentation, etc.
- `scss/` - Sass files that aren't tied to a component, so not in the above location. Avoid using if possible.
- `js/` - all js files here are combined into a single `dest/script.js` file.
- `images/icons/src/` - all SVGs here are combined into an SVG sprite. See `atoms/images/icons` in Pattern Lab.
- `dest/sassdoc/index.html` - Open this in a browser to see documentation on all Sass thanks to [SassDoc](http://sassdoc.com).

## Commands

Start up watches and local server after compiling:

```bash
npm start
```

Run Tests:

```bash
npm test
```

---

# Details

## Drupal 8

From your Drupal Twig templates in `templates/` you can `{% include %}`, `{% extends %}`, and `{% embed %}` your Pattern Lab Twig template files. Each of the top level folders has a Twig Namespace like `@organisms` and then you append the path down to the file like below.

    {% include "@organisms/path/to/file.twig" %}

## Configuration

See `/gulp-config.js`. Also, gulp tasks have been broken out into a `/gulp-tasks` folder.

### Linting Config

- Scss: edit `.sass-lint.yml` - [rule docs](https://github.com/sasstools/sass-lint/tree/master/docs/rules)
