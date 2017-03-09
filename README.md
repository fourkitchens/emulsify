[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg)](https://fourkitchens.com/)

# Emulsify: Pattern Lab + Drupal 8

Component-driven prototyping tool using [Pattern Lab v2](http://patternlab.io/) automated via Gulp/NPM. Also serves as a starterkit Drupal 8 theme.

## Requirements

  1. [Node (we recommend NVM)](https://github.com/creationix/nvm)
  2. [Gulp](http://gulpjs.com/)
  3. [Composer](https://getcomposer.org/)
  4. Optional: [Yarn](https://github.com/yarnpkg/yarn)

## Quickstart

  1. `npm install` or `yarn install`

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

[Pattern Lab Starter](https://github.com/phase2/pattern-lab-starter) and Emulsify share a lot in common (see [`Acknowledgements`](https://github.com/fourkitchens/emulsify/wiki/Acknowledgements)). Below is a breakdown of the two to aid in deciding which is best for your project.

<table><tbody>
<tr><td></td><td><strong>Emulsify</strong></td><td>Pattern Lab Starter</td><td></td></tr>
<tr><td>Lightweight</td><td>✔</td><td></td><td>Emulsify is about 1/2 the size of PLS</td></tr>
<tr><td>SVG sprite support </td><td><strong>✔</strong></td><td></td><td>PLS uses icon fonts.</td></tr>
<tr><td>Stock Drupal templates </td><td><strong>✔</strong></td><td></td><td>see /templates directory</td></tr>
<tr><td>Stock Components (see below) </td><td><strong>✔</strong></td><td></td><td>with Drupal support built-in</td></tr>
<tr><td>Yeoman generator</td><td></td><td>✔</td><td>Adds functionality to generate a new component using `yo component`</td></tr>
<tr><td>Faker support</td><td></td><td>✔</td><td>PHP "dummy" content generator</td></tr>
</tbody>
</table>

<h3 id="components">Emulsify's Built in Components (all responsive)</h3>
Forms, tables, video, accordion, cards, breadcrumbs, tabs, pager, status messages, grid

## Documentation
Documentation is currently provided in [the Wiki](https://github.com/fourkitchens/emulsify/wiki). Here are a few basic links:

#### General Orientation

See [Orientation](https://github.com/fourkitchens/emulsify/wiki/Orientation)

#### For Designers (Prototyping)

See [Designers](https://github.com/fourkitchens/emulsify/wiki/For-Designers)

#### For Drupal 8 Developers

See [Drupal Components](https://github.com/fourkitchens/emulsify/wiki/Drupal-Components)

#### Gulp Configuration

See [Gulp Config](https://github.com/fourkitchens/emulsify/wiki/Gulp-Config)
