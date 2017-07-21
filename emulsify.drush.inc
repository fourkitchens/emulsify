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
    'description' => 'Create an Emulsify subtheme.',
    'arguments' => array(
      'name'         => 'The name of your subtheme.',
    ),
    'options' => array(
      'machine_name' => 'The machine-readable name of your subtheme. This will be auto-generated from the human-readable name if ommited.',
      'description' => 'The description of your subtheme',
      'path' => 'The destination of your subtheme. Defaults to "all" (themes).',
      'slim' => 'Only copy base files',
    ),
    'examples' => array(
      'drush emulsify "subtheme"' => 'Creates an Emulsify subtheme called "subtheme", using the default options.',
      'drush emulsify "subtheme" --machine_name=subtheme' => 'Creates a Emulsify subtheme called "subtheme" with a specific machine name.',
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
      return dt('This command will create an Emulsify subtheme. See examples to get started.');
  }
}

/**
 * Implements drush_hook_COMMAND().
 */
function drush_emulsify($name = NULL) {

  // If no $name provided, abort.
  if (!$name) {
    drush_print(dt('Theme name missing. See help using drush emulsify --help.'));
    return;
  }

  // Determine the theme name.
  if (!isset($name)) {
    $name = drush_get_option('name');
  }

  // Determine the machine name.
  $machine_name = drush_get_option('machine_name');
  if (!$machine_name) {
    $machine_name = $name;
  }
  $machine_name = str_replace(' ', '_', strtolower($machine_name));
  $search = array(
    // Remove characters not valid in function names.
    '/[^a-z0-9_]/',
    // Functions must begin with an alpha character.
    '/^[^a-z]+/',
  );
  $machine_name = preg_replace($search, '', $machine_name);

  // Description of subtheme.
  $description = (drush_get_option('description')) ? trim(drush_get_option('description')) : 'Theme that uses Pattern Lab v2.';

  // Determine the path to the new subtheme.
  $subtheme_path = 'themes';
  if ($path = drush_get_option('path')) {
    $subtheme_path = drush_trim_path($path);
  }

  drush_emulsify_create($name, $machine_name, $description, $subtheme_path);
}

/**
 * Create frontend theme.
 */
function drush_emulsify_create($name, $machine_name, $description, $subtheme_path) {
  $subtheme_path = drush_normalize_path(drush_get_context('DRUSH_DRUPAL_ROOT') . '/' . $subtheme_path . '/' . $machine_name);

  if (!is_dir(dirname($subtheme_path))) {
    drush_die(dt('The directory "!directory" was not found.', array('!directory' => dirname($subtheme_path))));
  }

  // Phase 1: Copy files.
  $files_to_copy = _emulsify_get_files_to_copy();
  _emulsify_copy_files($files_to_copy, $subtheme_path);

  // Phase 2: Alter files.
  $alterations = _emulsify_get_alterations($name, $machine_name);
  $files_to_alter = _emulsify_get_files_to_alter();
  _emulsify_alter_files($subtheme_path, $files_to_alter, $alterations);

  // Phase 3: Rename files.
  $files_to_rename = _emulsify_get_files_to_rename();
  _emulsify_rename_files($subtheme_path, $machine_name, $files_to_rename);

  _emulsify_notify($name, $subtheme_path);
}

/**
 * Gets files to copy.
 *
 * This function supports both directories and individual files.  Alterations
 * happen in sequential order so you can replace something that was previously
 * replaced.
 */
function _emulsify_get_alterations($name, $machine_name) {
  return array(
    'Emulsify' => $name,
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
      'css',
      'dist',
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
function _emulsify_alter_files($subtheme_path, $files_to_alter = array(), $alterations = array(), $absolute = FALSE) {
  if (empty($files_to_alter) || empty($alterations)) {
    return TRUE;
  }
  foreach ($files_to_alter as $file_to_replace) {
    if ($absolute === TRUE) {
      $file_type = filetype($file_to_replace);
      $file_path = $file_to_replace;
    }
    else {
      $file_type = filetype($subtheme_path . DIRECTORY_SEPARATOR . $file_to_replace);
      $file_path = $subtheme_path . DIRECTORY_SEPARATOR . $file_to_replace;
    }

    if ($file_type === 'dir') {
      $files = file_scan_directory($file_path, '/\.*/');
      _emulsify_alter_files($subtheme_path, array_keys($files), $alterations, TRUE);
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
function _emulsify_rename_files($subtheme_path, $machine_name, $files_to_rename = array()) {
  foreach ($files_to_rename as $file_to_rename_path) {
    $file_original_path = $subtheme_path . DIRECTORY_SEPARATOR . $file_to_rename_path;
    $file_new_path = $subtheme_path . DIRECTORY_SEPARATOR . str_replace('emulsify', $machine_name, $file_to_rename_path);
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
function _emulsify_notify($name, $subtheme_path) {
  // Notify user of the newly created theme.
  $message = 'Successfully created the Emulsify subtheme "!name" created in: !path';

  $message = dt($message . '.', array(
    '!name' => $name,
    '!path' => $subtheme_path,
  ));
  drush_print($message);
}
