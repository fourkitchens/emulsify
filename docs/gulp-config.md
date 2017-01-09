## Gulp Setup

### Available Commands

#### Linting
Javascript: `gulp eslint`

PHP: `gulp phpcs`

Both: `gulp lint`

#### Performance Testing
Google PageSpeed Insights: `gulp psi`

WebPageTest.org: `gulp wpt`

Both: `gulp qa`

### Local Configuration

Emulsify keeps Gulp config in a dedicated file and allows you to override those defaults by keeping a local config file in your project. For example, if you want to run all gulp tasks from the root of a Drupal 8 project, below are the steps required:

1. Create `local.gulp-config.js` in your root directory and copy/override contents from the [original](https://github.com/fourkitchens/emulsify-gulp/blob/develop/gulp-config.js)
2. In that file, set the theme path accordingly, e.g. `var themeDir = './docroot/themes/custom/emulsify/';`
3. Also, set the browserSync startPath variable, e.g., `startPath: 'docroot/themes/custom/emulsify/pattern-lab/public/',`
