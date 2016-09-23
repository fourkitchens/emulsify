[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg)](https://fourkitchens.com/)

Component-driven prototyping tool using [Pattern Lab v2](http://patternlab.io/) automated via Gulp/NPM. Also serves as a starterkit Drupal 8 theme.

## Requirements

  1. [Node installed using NVM](https://github.com/creationix/nvm) (tested with v5.0)
  2. [Gulp](http://gulpjs.com/)

## Installation

  1. `npm install`
  2. If prompted about the Pattern Lab starterkit, select '1' for pattern-lab/starterkit-twig-base

#### (Drupal-specific installation)

  1. Download and enable [Components](https://www.drupal.org/project/components) module in your Drupal installation
  2. Enable FourK theme

## Starting Pattern Lab and watch task

  Start up watches and local server after compiling (runs all gulp required tasks):

  ```bash
  npm start
  ```

  ---

## Building Using Components

See `/docs/components.md`

## Using Components in Drupal 8

See `/docs/drupal-components.md`
