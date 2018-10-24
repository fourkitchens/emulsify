/**
 * Install Pattern Lab.
 */
const shell = require("shelljs");
const fs = require('fs');
const path = {
  'drupalComposer': '../../../../vendor/drupal-pattern-lab',
  'drupalNoComposer': './../../vendor/drupal-pattern-lab',
  'standalone': 'vendor/drupal-pattern-lab'
}

function vendorPathInstalled() {
  if (fs.existsSync(path.standalone) || fs.existsSync(path.drupalComposer) || fs.existsSync(path.drupalNoComposer)) {
    return true;
  }
  return false;
}

function vendorDirectoryRoute() {
  if (fs.existsSync(path.standalone)) {
    return path.standalone;
  } else if (fs.existsSync(path.drupalComposer)) {
    return path.drupalComposer;
  } else if (fs.existsSync(path.drupalNoComposer)) {
    return path.drupalNoComposer;
  } else {
    return false;
  }
}

if (vendorPathInstalled()) {
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
