This starterkit includes a theme that uses a reusable component approach, an automated styleguide using [Pattern Lab v2](http://patternlab.io/) as well as a gulp installation to automate SCSS compilation, Pattern Lab, etc. Instructions for installing and building inside of the theme can be found below:

## Requirements

  1. [Node installed using NVM](https://github.com/creationix/nvm) (tested with v5.0)

## Installation

  1. `npm install`
  2. If prompted about the Pattern Lab starterkit, select '1' for pattern-lab/starterkit-twig-base

#### (Drupal-specific installation)

  1. Download and enable [Components](https://www.drupal.org/project/components) module in your Drupal installation
  2. Enable FourK theme

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
2. Issue with VM not working without index.html
3. Get Drupal CKEditor markup to output text classes and remove unnecessary files
