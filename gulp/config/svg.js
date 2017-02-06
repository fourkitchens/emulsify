'use strict';

/*************************************************************
 * Variables
 ************************************************************/
var paths = global.paths;
// Local
var svgGlob = [paths.themeDir + 'svg-src/**/*.svg']; // Source Folder for non optimized SVG's.
var svgKeepAttrsGlob = [ // Keep Stroke / Fill Attributes for these folders.
  paths.themeDir + 'svg-src/*.svg',
  paths.themeDir + 'svg-src/**/svg-art/**/*.svg'
];
var svgSource = svgGlob.concat(svgKeepAttrsGlob.map(function (i) { // Exclude folder to Keep Fills & Strokes Attributes
  return '!' + i;
}));
// Globals
global.config.svg = {
  src: svgSource,
  keepAttributesSrc: svgKeepAttrsGlob,
  dest: paths.dist_svg,
  watcher: false,
  gzipFormat: 'svgz',
  //
  sizeReport: {
    enabled: false,
    options: {
      '*': {
        'maxSize': 50000 // Alert if > Max Size in Bytes after gzip
      }
    }
  },
  // Setting Remove Attributes: Strokes and Fills (for CSS color controll on SVGs)
  removeAttrs: {
    multipass: true,
    svgoPlugins: [
      {removeAttrs: {attrs: ['stroke', 'fill']}}
    ]
  },
  // Setting leaves Colors intact
  keepAttrs: {
    multipass: true
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
            dest: '../components/_patterns/01-atoms/image/icons/_icon_sprite.scss',
            template: './gulp/lib/svg-icons/sprite.scss.handlebars'
          }
        }
      }
    }
  }
};
