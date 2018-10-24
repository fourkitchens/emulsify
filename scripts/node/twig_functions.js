#!/usr/bin/env node
/**
 * Install Twig Functions.
 */
const shell = require('shelljs');
const fs = require('fs-extra');
const PATHS = {
  'drupalComposer': '../../../../vendor/drupal-pattern-lab',
  'drupalNoComposer': './../../vendor/drupal-pattern-lab',
  'standalone': 'vendor/drupal-pattern-lab'
}

function vendorDirectoryRoute() {
  return Object.values(PATHS).find(fs.existsSync);
}

const vendorPath = vendorDirectoryRoute();

if (typeof vendorPath != 'undefined') {
  const vendorPath = vendorDirectoryRoute();
  shell.echo('✅ Vendor directory found. Installing Twig Functions.')
  shell.cp(`${vendorPath}/add-attributes-twig-extension/add_attributes.function.php`, 'components/_twig-components/functions/');
  shell.cp(`${vendorPath}/bem-twig-extension/bem.function.php`, 'components/_twig-components/functions/');
  shell.cp(`${vendorPath}/attach-library-twig-extension/pl_attach-library.function.php`, 'components/_twig-components/functions/');
} else {
  shell.echo('🚫 Vendor directory not found.')
  shell.echo('💻 Please run `composer install` and run this again.')
}

shell.exit();
