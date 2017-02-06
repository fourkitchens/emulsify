# Mainspring: Pattern Lab + Drupal 8

Component-driven prototyping tool using [Pattern Lab v2](http://patternlab.io/) automated via Gulp. Also serves as a starterkit Drupal 8 theme.

## Requirements

  1. [Node (we recommend NVM)](https://github.com/creationix/nvm)
  2. [Gulp](http://gulpjs.com/)
  3. [Composer](https://getcomposer.org/)
  4. Optional: [Yarn](https://github.com/yarnpkg/yarn)

## Quickstart

From the theme folder, run: 

```bash
npm run init
```
  
This command will:

1. Install Gulp & Yarn globally in case you don't have them
2. Install the needed theme dependencies. *Note* dev related dependencies are installed which manage and run the theme's build tasks.
3. Creates a local.gulp-config.js (already gitignored) should you need or want to override the defaults things.
4. Runs a build of the theme assets so if you don't enter Pattern Lab right away, sites assets will still be ready to go in drupal!

You can run these manually, or simply use `npm i` if you prefer and have Gulp already, but yarn will install your deps in half the time npm does...

#### (Drupal-specific installation)

  1. Download and enable [Components](https://www.drupal.org/project/components) module
  2. Enable Emulsify theme

## Starting Pattern Lab and watch task

This is the most desired and best way to work with this theme. The following command starts up watches, a local server after compiling, and runs all essentials tasks to let you jump into development.

  ```bash
  gulp
  ```

The key benefits of the tasks bundled into this process:

* Pattern Lab is served on a localhost using BrowserSync for you to work with building and revise your components easily  
* Images and svg on init are processed and optimized. In the case of SVGs, they are bundled in to sprite packages for optimal use on site
* Updating sass or js code will live stream the updates to the browser, meaning you won't have or see a reload take place
* Sass docs runs along the watcher providing real time documentation generation on your styling details
* Updating twig and yml files and such will automatically reload the page you were viewing, needed to recompile assets for Pattern Lab
* Depending on your config, you can see lint/hint options on updates your working with to help ensure yours standing on the path all of your team is following with standards

# But wait, there's more!

A do everything for you command isn't good enough. Fear not, you have a lot of tools at your finger tips to get busy with and extend the functionality of the process.

## Gulp Config & Tasks

### Folders 

`gulp/config` Contains configuration specific to groups of tasks, broken apart for you to easily digest their purpose and defaults. 

`gulp/lib` A some collection of supporting functions leveraged in tasks.

`gulp/tasks` The bread and butter of the theme automation, for compile, serving, watching, and when needed cleaning.

`gulp/tests` A couple of performance tests.

### Config

All config options get pooled together, allowing you to easily override options in your local.gulp-config.js file.

I.e. Not a fan of source maps? Disable them with ease:
```js
module.exports = {
  js: {
    sourceMapEmbed: false,
  },
  sass: {
    sourceMapEmbed: false,
  },
};
```

Want to have BrowserSync automatically open up a new tab in your browser when it initalizes? No problem!

```js
module.exports = {
  browserSync: {
      defaults: {
          open: true // Opens a new tab, yay!
      },
  },
};
```

The sky's your limit, until you break something. :p

### Tasks

There are plethora of gulp tasks readily available to you. Most run as part of the watcher with the default config, but you're free to override any you need.

#### Common

`gulp` The default watcher. This will compile all of the needed assets (some which only run on init or manually there after). Once ready, it will then begin to serve pattern lap so you can start working with it. In typical development, this is the only command you'll need to use on a regular basis.

`gulp build` This runs all of the compiling tasks without serving up pattern lab. Useful when handling things like git merges between branches.

`gulp clean` Because sometimes you just gotta! This will run the various clean tasks to empty out the compile folder.

#### JS

`gulp js` This will perform all of the enabled js tasks based on your config. By default it will compile JS files within your components (minify, sorucemap, and more).

`gulp js:hint` Performs JS hint checks against component JS, leveraging the defined .jshintrc settings.

`gulp js:lint` Performs JS lint checks against component JS, leveraging the defined .eslint.js settings. These by default are inherited from Google's JS standards with some desired overrides to make it more manageable.

#### Sass

`gulp sass` This will perform all of the enabled sass tasks based on your config. By default it will compile Sass (minify, sourcemaps, and more) and run sass docs.

`gulp sass:docs` Generates new Sass docs from the current component styles.

`gulp:lint` Performs Sass lint checks against component styles, leveraging the defined .sass-lint.yml settings.

#### SVG

`svg` This will perform all of the SVG related tasks to minify and sprite the SVG icons in the theme to be leveraged in components. They can be targeted in a number of ways, with the sprite files, or individual SVG if required. The sprite files automatically have PNG fall backs for dated browsers which is why they are the desired way to leverage them on site.

Because this is only run on load and not as a watcher by default (though can be enabled though config), often you just need to run it manually should you need it easily.
