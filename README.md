[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg)](https://fourkitchens.com/)

Component-driven prototyping tool using [Pattern Lab v2](http://patternlab.io/) automated via Gulp/NPM. Also serves as a starterkit Drupal 8 theme.

## Requirements

  1. [Node (we recommend NVM)](https://github.com/creationix/nvm)
  2. [Gulp](http://gulpjs.com/)
  3. [Composer](https://getcomposer.org/)

## Installation

  1. `npm install`
  2. At Pattern Lab starterkit prompt, select '1' for pattern-lab/starterkit-twig-base

#### (Drupal-specific installation)

  1. Download and enable [Components](https://www.drupal.org/project/components) module
  2. Enable Emulsify theme

## Starting Pattern Lab and watch task

  Start up watches and local server after compiling (runs all gulp required tasks):

  ```bash
  npm start
  ```

  ---

## Emulsify versus Pattern Lab Starter

[Pattern Lab Starter](https://github.com/phase2/pattern-lab-starter) and Emulsify share a lot in common (see [`Acknowledgements`](https://github.com/fourkitchens/emulsify/blob/master/docs/acknowledgements.md)). Below is a breakdown of the two to aid in deciding which is best for your project.

<table>
<tr><td></td><td><strong>Emulsify</strong></td><td>Pattern Lab Starter</td><td></td></tr>
<tr><td>SVG sprite support built-in</td><td><strong>√</strong></td><td></td><td></td></tr>
<tr><td>Icon font support built-in</td><td></td><td>√</td><td></td></tr>
<tr><td>Base theme</td><td><strong>√ (Stark)</strong></td><td></td><td></td></tr>
<tr><td>Stock Drupal templates (from Stark)</td><td><strong>√</strong></td><td></td><td></td></tr>
<tr><td>Stock Components (see [below](#components)) </td><td><strong>√</strong></td><td></td><td></td></tr>
<tr><td>Yeoman generator support</td><td></td><td>√</td><td>Allows the user to generate a new component using `yo component`</td></tr>
<tr><td>Yarn support</td><td></td><td>√</td><td></td></tr>
<tr><td>Babel support built-in</td><td></td><td>√</td><td></td></tr>
<tr><td>[Faker](https://github.com/fzaninotto/Faker) support built-in</td><td></td><td>√</td><td>PHP "dummy" content generator</td></tr>
</table>

<h3 id="components">Built in Components (all responsive)</h3>
Forms, tables, video, accordion, cards, breadcrumbs, tabs, pager, status messages, grid

## Documentation

#### General Orientation

See [`/docs/orientation.md`](https://github.com/fourkitchens/emulsify/blob/master/docs/orientation.md)

#### For Designers (Prototyping)

See [`/docs/designers.md`](https://github.com/fourkitchens/emulsify/blob/master/docs/drupal-components.md)

#### For Drupal 8 Developers

See [`/docs/drupal-components.md`](https://github.com/fourkitchens/emulsify/blob/master/docs/designers.md)

## What Sets it Apart

Pattern Lab Starter is another popular option for combining prototyping and a Drupal 8 theme. Here's a breakdown on the differences between the two:


## Acknowledgements

See [`/docs/acknowledgements.md`](https://github.com/fourkitchens/emulsify/blob/master/docs/acknowledgements.md)
