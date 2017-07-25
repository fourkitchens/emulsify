<?php

/**
 * @file
 * Contains Drush hooks. Inspired by Aeon drush commands.
 */

/**
 * Implements hook_drush_command().
 */
function emulsify_drush_command() {
  $items = array();

  $items['emulsify'] = array(
    'description' => 'Create an Emulsify-based theme.',
    'arguments' => array(
      'human_readable_name'         => 'The name of your theme.',
    ),
    'options' => array(
      'machine_name' => 'The machine-readable name of your theme. This will be auto-generated from the human-readable name if ommited.',
      'description' => 'The description of your theme',
      'path' => 'The destination of your theme. Defaults to "themes/custom".',
      'slim' => 'Only copy base files',
    ),
    'examples' => array(
      'drush emulsify "theme"' => 'Creates an Emulsify theme called "theme", using the default options.',
      'drush emulsify "theme" --machine_name=theme' => 'Creates a Emulsify theme called "theme" with a specific machine name.',
    ),
  );

  return $items;
}

/**
 * Implements hook_drush_help().
 */
function emulsify_drush_help($section) {
  switch ($section) {
    case 'drush:emulsify':
      return dt('This command will create an Emulsify theme. See examples to get started.');
  }
}

/**
 * Implements drush_hook_COMMAND().
 */
function drush_emulsify($human_readable_name = NULL) {

  // If no $human_readable_name provided, abort.
  if (!$human_readable_name) {
    drush_print(dt('Theme name missing. See help using drush emulsify --help.'));
    return;
  }

  // Determine the theme name.
  if (!isset($human_readable_name)) {
    $human_readable_name = drush_get_option('human_readable_name');
  }

  // Determine the machine name.
  $machine_name = drush_get_option('machine_name');
  if (!$machine_name) {
    $machine_name = $human_readable_name;
  }
  $machine_name = str_replace(' ', '_', strtolower($machine_name));
  $search = array(
    // Remove characters not valid in function names.
    '/[^a-z0-9_]/',
    // Functions must begin with an alpha character.
    '/^[^a-z]+/',
  );
  $machine_name = preg_replace($search, '', $machine_name);

  // Description of theme.
  $description = (drush_get_option('description')) ? trim(drush_get_option('description')) : 'Theme based on <a href="http://emulsify.info">Emulsify</a>.';

  // Determine the path to the new theme.
  $theme_path = 'themes/custom';
  if ($path = drush_get_option('path')) {
    $theme_path = drush_trim_path($path);
  }

  drush_emulsify_create($human_readable_name, $machine_name, $description, $theme_path);
}

/**
 * Create frontend theme.
 */
function drush_emulsify_create($human_readable_name, $machine_name, $description, $theme_path) {
  $theme_path = drush_normalize_path(drush_get_context('DRUSH_DRUPAL_ROOT') . '/' . $theme_path . '/' . $machine_name);

  if (!is_dir(dirname($theme_path))) {
    drush_die(dt('The directory "!directory" was not found.', array('!directory' => dirname($theme_path))));
  }

  // Phase 1: Copy files.
  $files_to_copy = _emulsify_get_files_to_copy();
  _emulsify_copy_files($files_to_copy, $theme_path);

  // Phase 2: Alter files.
  $alterations = _emulsify_get_alterations($human_readable_name, $machine_name);
  $files_to_alter = _emulsify_get_files_to_alter();
  _emulsify_alter_files($theme_path, $files_to_alter, $alterations);

  // Phase 3: Rename files.
  $files_to_rename = _emulsify_get_files_to_rename();
  _emulsify_rename_files($theme_path, $machine_name, $files_to_rename);

  _emulsify_notify($human_readable_name, $theme_path);
}

/**
 * Gets alterations (string replacements).
 *
 * This function supports both directories and individual files.  Alterations
 * happen in sequential order so you can replace something that was previously
 * replaced.
 */
function _emulsify_get_alterations($human_readable_name, $machine_name) {
  return array(
    'Emulsify' => $human_readable_name,
    'emulsify' => $machine_name,
    'hidden: true' => '',
  );
}

/**
 * Returns an array of files to make string replacements.
 */
function _emulsify_get_files_to_alter() {
  // Slim files and directories declaration.
  $slim_array = array(
    'components',
    'emulsify.info.yml',
    'emulsify.theme',
  );
  // If we would like to have a bare copy we use is slim option.
  if (drush_get_option('slim') === TRUE) {
    return $slim_array;
  }
  else {
    return array_merge($slim_array, array(
      'templates',
      'emulsify.breakpoints.yml',
      'emulsify.libraries.yml',
      'README.md',
    ));
  }
}

/**
 * Gets files to copy.
 *
 * This function supports both directories and individual files.
 *
 * The following directories/files will never be copied:
 * css/
 * dist/
 * node_modules/
 * github.com/
 * composer.json
 * LICENSE.txt
 * emulsify.drush.inc
 */
function _emulsify_get_files_to_copy() {
  // Slim files and directories declaration.
  $slim_array = array(
    'components',
    'pattern-lab',
    '.editorconfig',
    '.gitignore',
    '.stylelintrc',
    'emulsify.info.yml',
    'emulsify.theme',
    'gulpfile.js',
    'package.json',
    'yarn.lock',
  );
  // If we would like to have a bare copy we use is slim option.
  if (drush_get_option('slim') === TRUE) {
    return $slim_array;
  }
  else {
    return array_merge($slim_array, array(
      'fonts',
      'images',
      'templates',
      'emulsify.breakpoints.yml',
      'emulsify.libraries.yml',
      'README.md',
      'screenshot.png',
    ));
  }
}

/**
 * Get files to rename.
 */
function _emulsify_get_files_to_rename() {
  // Slim files and directories declaration.
  $slim_array = array(
    'emulsify.info.yml',
    'emulsify.theme',
  );
  // If we would like to have a bare copy we use is slim option.
  if (drush_get_option('slim') === TRUE) {
    return $slim_array;
  }
  else {
    return array_merge($slim_array, array(
      'emulsify.breakpoints.yml',
      'emulsify.libraries.yml',
    ));
  }
}

/**
 * Alter strings within files.
 */
function _emulsify_alter_files($theme_path, $files_to_alter = array(), $alterations = array(), $absolute = FALSE) {
  if (empty($files_to_alter) || empty($alterations)) {
    return TRUE;
  }
  foreach ($files_to_alter as $file_to_replace) {
    if ($absolute === TRUE) {
      $file_type = filetype($file_to_replace);
      $file_path = $file_to_replace;
    }
    else {
      $file_type = filetype($theme_path . DIRECTORY_SEPARATOR . $file_to_replace);
      $file_path = $theme_path . DIRECTORY_SEPARATOR . $file_to_replace;
    }

    if ($file_type === 'dir') {
      $files = file_scan_directory($file_path, '/\.*/');
      _emulsify_alter_files($theme_path, array_keys($files), $alterations, TRUE);
    }
    elseif ($file_type === 'file') {
      _emulsify_file_str_replace($file_path, array_keys($alterations), $alterations);
    }
  }
}

/**
 * Copy files.
 *
 * @param array $files
 *   An array of files (strings) to copy.
 * @param string $destination_path
 *   A string representing the destination path.
 *
 * @return bool
 *   A boolean representing the success or failure of the command.
 */
function _emulsify_copy_files($files = array(), $destination_path = '') {
  if (empty($files) || empty($destination_path)) {
    return FALSE;
  }
  file_prepare_directory($destination_path, FILE_CREATE_DIRECTORY);
  foreach ($files as $files_to_copy) {
    drush_copy_dir(__DIR__ . DIRECTORY_SEPARATOR . $files_to_copy, $destination_path . DIRECTORY_SEPARATOR . $files_to_copy);
  }
  return TRUE;
}

/**
 * Rename files.
 */
function _emulsify_rename_files($theme_path, $machine_name, $files_to_rename = array()) {
  foreach ($files_to_rename as $file_to_rename_path) {
    $file_original_path = $theme_path . DIRECTORY_SEPARATOR . $file_to_rename_path;
    $file_new_path = $theme_path . DIRECTORY_SEPARATOR . str_replace('emulsify', $machine_name, $file_to_rename_path);
    drush_op('rename', drush_normalize_path($file_original_path), drush_normalize_path($file_new_path));
  }
}

/**
 * Replace strings in a file.
 */
function _emulsify_file_str_replace($file_path, $find, $replace) {
  $file_path = drush_normalize_path($file_path);
  $file_contents = file_get_contents($file_path);
  $file_contents = str_replace($find, $replace, $file_contents);
  file_put_contents($file_path, $file_contents);
}

/**
 * Notifies the user of success.
 */
function _emulsify_notify($human_readable_name, $theme_path) {
  // Notify user of the newly created theme.
  $message = 'Successfully created the Emulsify theme "!name" created in: !path, you can now run \'yarn\' or \'yarn install\' or \'npm install\' to install the node modules.';

  $message = dt($message, array(
    '!name' => $human_readable_name,
    '!path' => $theme_path,
  ));
  drush_print($message);
}
