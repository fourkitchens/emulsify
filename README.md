[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg)](https://fourkitchens.com/)

:warning: **You are viewing the legacy version of Emulsify** :warning:

You can find the current version of Emulsify Design System at [github.com/emulsify-ds](https://github.com/emulsify-ds/)

If you'd like to upgrade your Emulsify project to the new version, [check out this documentation](https://docs.emulsify.info/installation/upgrading). 

---

# Emulsify (legacy version)
### Pattern Lab + Drupal 8

Component-driven prototyping tool using [Pattern Lab v2](http://patternlab.io/) automated via Gulp/NPM. Also serves as _a starterkit_ Drupal 8 theme.

## Requirements

1.  [PHP 7.1](http://www.php.net/)
2.  [Node (we recommend NVM)](https://github.com/creationix/nvm)
3.  [Gulp](http://gulpjs.com/)
4.  [Composer](https://getcomposer.org/)
5.  Optional: [Yarn](https://github.com/yarnpkg/yarn)

## Prototyping (separate from Drupal, Wordpress, etc.)

Emulsify supports both NPM and YARN.

Install with NPM:
`composer create-project fourkitchens/emulsify:^3.0 --stability dev --no-interaction emulsify && cd emulsify && npm install`

Install with Yarn:
`composer create-project fourkitchens/emulsify:^3.0 --stability dev --no-interaction emulsify && cd emulsify && yarn install`

## Drupal installation

### In a Composer-based Drupal install (recommended)

1. Require emulsify in your project `composer require fourkitchens/emulsify`
2. Move into the original emulsify theme `cd web/themes/contrib/emulsify/`
3. Create your new theme by cloning emulsify `php emulsify.php "THEME NAME"` (Run `php emulsify.php -h` for other available options)
4. Move into your theme directory `cd web/themes/custom/THEME_NAME/`
5. Install the theme dependencies `npm install` or `yarn install`
6. Enable your theme and its dependencies `drush then THEME_NAME -y && drush en components unified_twig_ext -y`
7. Proceed to the "Starting Pattern Lab…" section below

If you're not using a Composer-based Drupal install (e.g. tarball download from drupal.org) installation [instructions can be found on the Wiki](https://github.com/fourkitchens/emulsify/wiki/Install-(without-Composer)).

Troubleshooting Installation: See [Drupal Installation FAQ](https://github.com/fourkitchens/emulsify/wiki/Install-(Composer)#drupal-installation-faq).

_Note: Once you've created your custom theme, you can remove Emulsify as a dependency of your project. If you'd like to get updates as we push them, solely for educational/best-practice information, feel free to leave it in and receive the updates. Updating Emulsify will not affect your custom theme in any way._

## Starting Pattern Lab and watch task

The `start` command spins up a local server, compiles everything (runs all required gulp tasks), and watches for changes.

1.  `npm start` or `yarn start`

---

## Highlighted Features

<table><tbody>
<tr><td>Lightweight</td><td>✔</td><td>Emulsify is focused on being as lightweight as possible.</td></tr>
<tr><td>SVG sprite support </td><td><strong>✔</strong></td><td>Automated support for creating SVG sprites.</td></tr>
<tr><td>Stock Drupal templates </td><td><strong>✔</strong></td><td>Templates from Stable theme - see /templates directory</td></tr>
<tr><td>Stock Components </td><td><strong>✔</strong></td><td>with Drupal support built-in (https://github.com/fourkitchens/emulsify#emulsifys-built-in-components-with-drupal-support)</td></tr>
<tr><td>Performance Testing </td><td><strong>✔</strong></td><td>Support for testing via Google PageSpeed Insights and WebPageTest.org (https://github.com/fourkitchens/emulsify/wiki/Gulp-Config#performance-testing)</td></tr>
<tr><td>Automated Github Deployment </td><td><strong>✔</strong></td><td>Deploy your Pattern Lab instance as a Github page (https://github.com/fourkitchens/emulsify/wiki/Gulp-Config#deployment)</td></tr>
<tr><td>Automated Accessibility Testing </td><td><strong>✔</strong></td><td>Accessibility Testing using pa11y (https://github.com/fourkitchens/emulsify/wiki/Accessibility-Testing)</td></tr>
</tbody></table>

<h3 id="components">Emulsify's Built in Components with Drupal support</h3>
Forms, tables, video, accordion, cards, breadcrumbs, tabs, pager, status messages, grid

View a [demo of these default Emulsify components](https://fourkitchens.github.io/emulsify/pattern-lab/public/).

## Documentation

Documentation is currently provided in [the Wiki](https://github.com/fourkitchens/emulsify/wiki). Here are a few basic links:

#### General Orientation

See [Orientation](https://github.com/fourkitchens/emulsify/wiki/Orientation)

We have a [series of videos](https://www.youtube.com/playlist?list=PLO9S6JjNqWsGMQLDfE8Ekt0ryrGa3g4km) for you to learn more about Emulsify.

#### For Designers (Prototyping)

See [Designers](https://github.com/fourkitchens/emulsify/wiki/For-Designers)

#### For Drupal 8 Developers

See [Drupal Usage](https://github.com/fourkitchens/emulsify/wiki/Drupal-Usage)

#### Gulp Configuration

See [Gulp Config](https://github.com/fourkitchens/emulsify/wiki/Gulp-Config)
