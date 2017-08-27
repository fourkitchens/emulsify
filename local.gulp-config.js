/* globals module */

((() => {
  const themeDir = './';
  const paths = {
    js: `${themeDir}/components/_patterns/00-base/global/*.js`,
    styleguide_js: [
      `${themeDir}/js/**/*.js`,
      `${themeDir}/components/_patterns/**/*.js`,
    ],
    dist_js: `${themeDir}/dist`,
    sass: themeDir,
    img: `${themeDir}/images`,
    fonts: `${themeDir}/components/fonts`,
    dist_fonts: `${themeDir}/dist/fonts`,
    dist_css: `${themeDir}/dist/css`,
    dist_img: `${themeDir}/dist/img`,
    pattern_lab: `${themeDir}/pattern-lab/public`,
  };

  module.exports = {
    host: 'http://127.0.0.1:8888/',
    themeDir,
    paths,
    sassOptions: {
      outputStyle: 'expanded',
      eyeglass: {
        enableImportOnce: false,
      },
    },
    cssConfig: {
      enabled: true,
      src: `${themeDir}/components/_patterns/**/*.scss`,
      dest: `${themeDir}/dist/`,
      flattenDestOutput: true,
      lint: {
        enabled: false,
        failOnError: true,
      },
      sourceComments: false,
      sourceMapEmbed: false,
      outputStyle: 'expanded',
      autoPrefixerBrowsers: [
        'last 2 versions',
        'IE >= 9',
      ],
      includePaths: (['./node_modules']),
    },
    patternLab: {
      enabled: true,
      configFile: `${themeDir}pattern-lab/config/config.yml`,
      watchedExtensions: (['twig', 'json', 'yaml', 'yml', 'md', 'jpg', 'jpeg', 'png']),
      scssToYAML: [
        {
          src: `${themeDir}/components/_patterns/00-base/global/01-colors/_color-vars.scss`,
          dest: `${themeDir}/components/_patterns/00-base/global/01-colors/colors.yml`,
          lineStartsWith: '$',
          allowVarValues: false,
        },
      ],
    },
    browserSync: {
      enabled: true,
      baseDir: './',
      startPath: 'pattern-lab/public/',
      // Uncomment below if using a specific local url
      // domain: 'emulsify.dev',
      notify: false,
      openBrowserAtStart: false,
      reloadOnRestart: true,
      ui: false,
    },
    wpt: {
      // WebPageTest API key https://www.webpagetest.org/getkey.php
      // key:
    },
  };
}))();
