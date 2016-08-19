This starterkit includes a theme that uses a reusable component approach, an automated styleguide using [Pattern Lab v2](http://patternlab.io/) as well as a gulp installation to automate SCSS compilation, Pattern Lab, etc. Instructions for installing and building inside of the theme can be found below:

## Requirements

  1. [Node installed using NVM](https://github.com/creationix/nvm) (tested with v5.0)
  2. [Composer](https://getcomposer.org/)

## Installation

  1. Download [fourk starterkit theme](https://github.com/evanmwillhite/fourk) to `themes/contrib` directory and rename `fourk`
  2. Download [PatternLab Twig edition](https://github.com/pattern-lab/edition-php-twig-standard/releases/download/v2.2.1/twig-standard.zip) to root of Drupal installation and rename to `pattern-lab`
  3. In the pattern lab directory, go to `config/config.yml` and change `sourceDir` to be `../themes/contrib/fourk/source`
  4. Download the contents of [fourk-gulp](https://github.com/evanmwillhite/fourk-gulp) to root of Drupal installation (e.g., ROOT/gulpfile.js)
  5. Run `npm install`
  6. Download and enable [Components](https://www.drupal.org/project/components) module in your Drupal installation
  7. Enable FourK theme

## Building Using Components

See `/docs/components.md`

## Commands

Start up watches and local server after compiling (runs all gulp required tasks):

```bash
npm start
```

---

# Details

## Drupal 8

See `/docs/drupal-components.md`

### Linting Config

- Scss: edit `.sass-lint.yml` - [rule docs](https://github.com/sasstools/sass-lint/tree/master/docs/rules)

## TODO

1. Gulp automation issue with adding new components (have to rerun `gulp pl:full`)
1. Issue with VM not working without index.html
1. Move remaining Drupal tpl markup to patterns
5. Get Drupal CKEditor markup to output text classes and remove unnecessary files
