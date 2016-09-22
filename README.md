This starterkit includes a theme that uses a reusable component approach, an automated styleguide using [Pattern Lab v2](http://patternlab.io/) as well as a gulp installation to automate SCSS compilation, Pattern Lab, etc. Instructions for installing and building inside of the theme can be found below:

## Requirements

  1. [Node installed using NVM](https://github.com/creationix/nvm) (tested with v5.0)

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
