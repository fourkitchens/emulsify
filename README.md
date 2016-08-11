This theme uses a reusable component approach with an automated styleguide using [Pattern Lab](http://patternlab.io/). Instructions for installing and building inside of the theme can be found below:

## Requirements

  1. [Node installed using NVM](https://github.com/creationix/nvm) (tested with v5.0)
  2. [Composer](https://getcomposer.org/)

## Installation

  1. Download [fourk starterkit theme](https://github.com/evanmwillhite/fourk) to themes directory and rename `fourk`
  2. Download the [PatternLab Twig edition](https://github.com/pattern-lab/edition-php-twig-standard/releases/download/v2.2.1/twig-standard.zip) contents to root of Drupal installation and rename to `pattern-lab`
  3. In the pattern lab directory, go to `config/config.yml` and change `sourceDir` to be `../themes/fourk/source`
  4. Download the contents of [fourk-gulp](https://github.com/evanmwillhite/fourk-gulp) to root of Drupal installation (e.g., ROOT/gulpfile.js)
  5. Run `npm install`
  6. Download and enable [Components](https://www.drupal.org/project/components) module

## Orientation

- `source/_patterns/` - The majority of Frontend work will be done here. The directory contains all component twig templates, Sass files, documentation, etc.
- `js/` - all js files here are combined into a single `dist/script.js` file.
- `images/icons/src/` - all SVGs here are combined into an SVG sprite. See `atoms/images/icons` in Pattern Lab.
- `dest/sassdoc/index.html` - Open this in a browser to see documentation on all Sass thanks to [SassDoc](http://sassdoc.com).

## Commands

Start up watches and local server after compiling (runs all gulp required tasks):

```bash
npm start
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

## TODO

1. Move remaining Drupal tpl markup to patterns
2. Automate icon twig
3. Better organization of high-level scss/js files
