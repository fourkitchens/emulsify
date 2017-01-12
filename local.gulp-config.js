// BrowserSync Proxy URL
var localUrl = 'mainspring.dev'; // EG 'localhost', 'mysite.dev'

// Style Guide Settings
//
// Add in these files to the <head> of the styleguide
var styleGuideExtraHead = [
  '<script src="//code.jquery.com/jquery-2.1.4.min.js"></script>',
  '<script src="../js/vendor/svg4everybody.min.js"></script>',
  '<script src="../js/vendor/velocity.min.js"></script>',
  '<script src="../js/vendor/eq.min.js"></script>',
  '<script src="../js/vendor/mainspring.accordion.js"></script>',
  '<script src="../js/styleguide.js"></script>',
];

// Page Title of Style Guide
var styleGuideTitle = 'Style Guide';

// Generate Style Guide in this folder
var styleGuideBuildPath = 'styleguide';

// ******************************** //
// *** Optional Config Settings *** //
// ******************************** //
// Only need to change if your use a non-default
// mainspring folder structure.

/////////////
// Sass & CSS Settings
// Watch scss files to compile to css
var scssPattern = ['scss/**/*.scss'];
var maxCssSize = 70000; // Warn if compiled css < 70kb (uncompressed)
var maxCssGzippedSize = 40000; // Warn if compiled css < 40kb (compressed)

/////////////
// Linters

// Exclude these SCSS files from linting
// Ignore any files in vendor folders
var sassLintExclusions = ['!scss/**/vendor/**/*.scss'];

// Lint all SCSS files, the sassLintExclusions files
var sassLintPattern = scssPattern.concat(sassLintExclusions);

// JS Linting these files. (Default is no minified or /vendor files)
var jsLintPattern = [
  'js/**/*.js',
  '!js/**/*.min.js', // Ignore minified files
  '!js/**/vendor/*.js']; // Ignore /vendor sub-folders

////////////////
// SVG Settings

// Source Folder for non optimized SVG's.
var svgPattern = ['svg-src/**/*.svg'];

// Keep Stroke / Fill Attributes for these folders.
var svgKeepAttributesPattern = ['svg-src/*.svg','svg-src/**/svg-art/**/*.svg'];

// Excluse folder to Keep Fills & Strokes Attributes
var svgSource = svgPattern.concat(svgKeepAttributesPattern.map(function (i){
    return '!' + i;
}));


// Export SVG sprites to this folder
var svgDestination = 'svg';

// Compressed SVG file extension (svgz or svg.gz)
var svgGzipFormat = 'svgz';

// Max size per SVG sprite
var maxSvgSize = 50000; // Warn if Sprited SVG < 50kb (compressed)


/* globals module */



(function () {
  'use strict';

  var themeDir = './';
  var paths = {
    js: themeDir + '/components/_patterns/00-base/*.js',
    styleguide_js: [
      themeDir + '/js/**/*.js',
      themeDir + '/components/_patterns/**/*.js'
    ],
    dist_js: themeDir + '/dist',
    sass: themeDir,
    img: themeDir + '/images',
    dist_css: themeDir + '/dist/css',
    dist_img: themeDir + '/dist/img'
  };

  module.exports = {
    host: 'http://127.0.0.1:8888/',
    themeDir: themeDir,
    paths: paths,
    sassOptions: {
      outputStyle: 'expanded',
      eyeglass: {
        enableImportOnce: false
      }
    },
    cssConfig: {
      enabled: true,
      src: themeDir + '/components/_patterns/**/*.scss',
      dest: themeDir + '/dist/',
      flattenDestOutput: true,
      lint: {
        enabled: false,
        failOnError: true
      },
      sourceComments: false,
      sourceMapEmbed: false,
      outputStyle: 'expanded',
      autoPrefixerBrowsers: [
        'last 2 versions',
        '- IE >= 9'
      ],
      includePaths: (['./node_modules']),
      sassdoc: {
        enabled: true,
        dest: themeDir + '/dist/sassdoc',
        verbose: false,
        sort: [
          'file',
          'group',
          'line'
        ]
      }
    },
    iconConfig: {
      shape: {
        dimension: {
          maxWidth: 15,
          maxHeight: 15
        },
        spacing: {         // Add padding
          padding: 10
        }
      },
      mode: {
        css: {
          bust: false,
          dest: '../../dist',
          prefix: '@mixin sprite-%s',
          render: {
            scss: {
              dest: '../components/_patterns/01-atoms/image/icon/_icon_sprite.scss',
              template: 'node_modules/emulsify-gulp/gulp-tasks/svg-icons/sprite.scss.handlebars'
            }
          }
        }
      }
    },
    patternLab: {
      enabled: true,
      configFile: themeDir + 'pattern-lab/config/config.yml',
      watchedExtensions: (['twig', 'json', 'yaml', 'yml', 'md', 'jpg', 'jpeg', 'png']),
      scssToJson: [
        {
          src: themeDir + '/components/_patterns/00-base/03-colors/_color-vars.scss',
          dest: themeDir + '/components/_patterns/00-base/03-colors/colors.json',
          lineStartsWith: '$',
          allowVarValues: false
        }
      ]
    },
    browserSync: {
      ui: false,
      enabled: true,
      baseDir: './',
      startPath: themeDir + 'pattern-lab/public/',
      // Uncomment below if using a specific local url
      // domain: 'emulsify.dev',
      openBrowserAtStart: true,
      browser: "google chrome",
      reloadDelay: 50,
      reloadDebounce: 750
    },
    eslint: {
      excludePatterns: ['!**/components/_annotations/*.js']
    },
    wpt: {
      // WebPageTest API key https://www.webpagetest.org/getkey.php
      // key:
    },

    // SVG spriting
    svgSprite: {
      svgSource: svgSource,
      svgKeepAttributesSource: svgKeepAttributesPattern,
      dest: svgDestination,
      svgGzipFormat: svgGzipFormat,
      // Setting leaves Colors intact
      settingsKeepAttrs: {
        multipass: true,
      },
      // Setting Remove Attributes: Strokes and Fills (for CSS color controll on SVGs)
      settingsRemoveAttrs: {
        multipass: true,
          svgoPlugins: [
            { removeAttrs : { attrs :['stroke', 'fill'] }}
          ],
      },
      //
      sizeReport: {
        enabled: true,
        settings: {
          '*': {
            'maxSize': maxSvgSize // Alert if > Max Size in Bytes after gzip
          }
        }
      }
    }
  };

})();


