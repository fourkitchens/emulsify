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
      'human_readable_name' => 'The name of your theme.',
    ),
    'options' => array(
      'machine-name' => 'The machine-readable name of your theme. This will be auto-generated from the human_readable_name if ommited.',
      'description' => 'The description of your theme',
      'path' => 'The destination of your theme. Defaults to "themes/custom".',
      'slim' => 'Only copy base files',
    ),
    'examples' => array(
      'drush emulsify "My Awesome Theme"' => 'Creates an Emulsify theme called "My Awesome Theme", using the default options.',
      'drush emulsify "My Awesome Theme" --machine-name=mat' => 'Creates a Emulsify theme called "My Awesome Theme" with the specific machine name "mat".',
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
    drush_print(dt('Theme name missing. See help using \'drush help emulsify\'.'));
    return;
  }

  // Determine the machine name.
  $machine_name = drush_get_option('machine-name');
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

  // Create your new theme.
  $status = drush_emulsify_create($human_readable_name, $machine_name, $description, $theme_path);

  // Notify the user of failure.
  if ($status === FALSE) {
    drush_set_error('EMULSIFY', 'Your theme was not successfully created.');
  }
}

/**
 * Create frontend theme.
 *
 * @param string $human_readable_name
 *   A string that will be used to represent the human readable name.
 * @param string $machine_name
 *   A string that will be used to name directories, files, and will be replaced
 *   in templates.
 * @param string $description
 *   A string that will be used as the theme description in the .info file.
 * @param string $theme_path
 *   A string that will be translated into a base path for your new theme.
 *
 * @return boolean
 *   A boolean representing the success or failure of the function.
 */
function drush_emulsify_create($human_readable_name, $machine_name, $description, $theme_path) {
  $theme_path = drush_normalize_path(drush_get_context('DRUSH_DRUPAL_ROOT') . DIRECTORY_SEPARATOR . $theme_path . DIRECTORY_SEPARATOR . $machine_name);

  // Phase: Validate theme path is writeable.
  $theme_path_status = _emulsify_validate_path($theme_path);
  if ($theme_path_status !== TRUE) {
    return _emulsify_notify_fail('', 'Failed on Phase: Validate theme path is writeable.');
  }

  // Phase: Verify there are not existing contents in the destination directory.
  $theme_path_empty_status = _emulsify_validate_path_is_empty($theme_path);
  if ($theme_path_empty_status !== TRUE) {
    return _emulsify_notify_fail('', 'Failed on Phase: Verify there are not existing contents in the destination directory.  Please either delete the contents or pick a different path by changing the machine name or using the \'--path\' option.  Use \'drush help emulsify\' for more information.');
  }

  // Phase: Make directories.
  $directories_to_make = _emulsify_get_directories_to_make();
  $directories_to_make_status = _emulsify_make_directories($directories_to_make, $theme_path);

  if ($directories_to_make_status !== TRUE) {
    return _emulsify_notify_fail('', 'Failed on Phase: Make directories.');
  }

  // Phase: Copy files.
  $files_to_copy = _emulsify_get_files_to_copy();
  $files_to_copy_status = _emulsify_copy_files($files_to_copy, $theme_path);

  if ($files_to_copy_status !== TRUE) {
    return _emulsify_notify_fail('', 'Failed on Phase: Copy files.');
  }

  // Phase: Alter files.
  $alterations = _emulsify_get_alterations($human_readable_name, $machine_name, $description);
  $files_to_alter = _emulsify_get_files_to_alter();
  $files_to_alter_status = _emulsify_alter_files($theme_path, $files_to_alter, $alterations);

  if ($files_to_alter_status !== TRUE) {
    return _emulsify_notify_fail('', 'Failed on Phase: Alter files.');
  }

  // Phase: Rename files.
  $files_to_rename = _emulsify_get_files_to_rename();
  $files_to_rename_status = _emulsify_rename_files($theme_path, $machine_name, $files_to_rename);

  if ($files_to_rename_status !== TRUE) {
    return _emulsify_notify_fail('', 'Failed on Phase: Rename files.');
  }

  // Phase 7: Return success message to the user.
  _emulsify_notify_success($human_readable_name, $theme_path);
}

/**
 * Gets alterations (string replacements).
 *
 * This function supports both directories and individual files.  Alterations
 * happen in sequential order so you can replace something that was previously
 * replaced.
 *
 * @param string $human_readable_name
 *   A string representing the human readable name.
 * @param string $machine_name
 *   A string representing the machine name.
 * @param string $description
 *   A string representing the desired description.
 *
 * @return array
 *   An array with a key representing the string to be replaced and value
 *   representing the string to replace it with.
 */
function _emulsify_get_alterations($human_readable_name, $machine_name, $description) {
  return array(
    'Emulsify' => $human_readable_name,
    'emulsify' => $machine_name,
    'Theme that uses Pattern Lab v2' => $description,
    'hidden: true' => '',
  );
}

/**
 * Returns an array of files and directories to make string replacements within.
 *
 * @return array
 *   A array representing files and directories to be altered.
 */
function _emulsify_get_files_to_alter() {
  // Slim files and directories declaration.
  $default_array = array(
    'emulsify.info.yml',
    'emulsify.theme',
    'emulsify.breakpoints.yml',
    'emulsify.libraries.yml',
  );
  // If we would like to have a bare copy we use is slim option.
  if (drush_get_option('slim') === TRUE) {
    return $default_array;
  }
  else {
    return array_merge($default_array, array(
      'components',
      'templates',
      'README.md',
    ));
  }
}

/**
 * Get directories to make.
 *
 * @return array
 *   An array of directories to make.
 */
function _emulsify_get_directories_to_make() {
  // If we would like to have a bare copy we use is slim option.
  if (drush_get_option('slim') === TRUE) {
    return array(
      'components/_patterns',
      'components/_patterns/00-base',
      'components/_patterns/00-base/global',
      'components/_patterns/01-atoms',
      'components/_patterns/02-molecules',
      'components/_patterns/03-organisms',
      'components/_patterns/04-templates',
      'components/_patterns/05-pages',
      'fonts',
      'images',
      'images/icons',
      'images/icons/src',
      'templates',
    );
  }
  else {
    return array();
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
 *
 * @return array
 *   An array of files to copy.
 */
function _emulsify_get_files_to_copy() {
  // Slim files and directories declaration.
  $default_array = array(
    '.editorconfig',
    '.gitignore',
    '.stylelintrc',
    'emulsify.info.yml',
    'emulsify.theme',
    'emulsify.breakpoints.yml',
    'emulsify.libraries.yml',
    'gulpfile.js',
    'package.json',
    'scripts',
    'yarn.lock',
  );
  // If we would like to have a bare copy we use is slim option.
  if (drush_get_option('slim') === TRUE) {
    return array_merge($default_array, array(
      'components/_data',
      'components/_macros',
      'components/_meta',
      'components/_twig-components',
      'components/css',
      'components/images',
      'components/_patterns/style.scss',
      'components/_patterns/00-base/global/01-colors',
      'components/_patterns/00-base/global/global.js',
    ));
  }
  else {
    return array_merge($default_array, array(
      'components',
      'fonts',
      'images',
      'templates',
      'README.md',
      'screenshot.png',
    ));
  }
}

/**
 * Get files to rename.
 *
 * @return array
 *   An array of files to rename.
 */
function _emulsify_get_files_to_rename() {
  // Slim files and directories declaration.
  $default_array = array(
    'emulsify.info.yml',
    'emulsify.theme',
    'emulsify.breakpoints.yml',
    'emulsify.libraries.yml',
  );
  // If we would like to have a bare copy we use is slim option.
  if (drush_get_option('slim') === TRUE) {
    return array_merge($default_array, array());
  }
  else {
    return array_merge($default_array, array());
  }
}

/**
 * Alter strings within files.
 *
 * @param string $theme_path
 *   A string representing the destination theme path.
 * @param array $files_to_alter
 *   An array representing the files that will be altered.
 * @param array $alterations
 *   An array of alteration that will be processed in sequential order on all
 *   files, this means that you can replace previous replacements.
 * @param boolean $absolute
 *   A boolean representing if the files to alter are represented as relative
 *   or absolute paths.
 *
 * @return boolean
 *   A boolean representing the success or failure of the function.
 */
function _emulsify_alter_files($theme_path, array $files_to_alter = array(), array $alterations = array(), $absolute = FALSE) {
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
      $alter_status = _emulsify_alter_files($theme_path, array_keys($files), $alterations, TRUE);
      if ($alter_status === FALSE) {
        return FALSE;
      }
    }
    elseif ($file_type === 'file') {
      $string_replace_status = _emulsify_file_str_replace($file_path, array_keys($alterations), $alterations);
      if ($string_replace_status === FALSE) {
        return FALSE;
      }
    }
  }

  // If we make it here return success.
  return TRUE;
}

/**
 * Make directories.
 *
 * @param array $directories
 *   An array of directories (strings) to make.
 * @param string $destination_path
 *   A string representing the destination path.
 *
 * @return boolean
 *   A boolean representing the success or failure of the function.
 */
function _emulsify_make_directories(array $directories = array(), $destination_path = '') {

  // Check for invalid settings and return an error.
  if (!is_array($directories) || !is_string($destination_path) || empty($destination_path)) {
    _emulsify_notify_fail('', "Invalid parameter passed to _emulsify_make_directories().");
    return FALSE;
  }

  // The $directories parameter can be empty and valid, return success.
  if (empty($directories)) {
    return TRUE;
  }

  // Copy desired files.
  foreach ($directories as $directory_to_make) {
    $directory_path = drush_normalize_path($destination_path . DIRECTORY_SEPARATOR . $directory_to_make);

    // Check if path is or can be writeable and exists, if not, return FALSE.
    if (!_emulsify_validate_path($directory_path)) {
      return FALSE;
    }
  }

  // If there were not issues return success.
  return TRUE;
}

/**
 * Copy files.
 *
 * @param array $files
 *   An array of files (strings) to copy.
 * @param string $destination_path
 *   A string representing the destination path.
 *
 * @return boolean
 *   A boolean representing the success or failure of the function.
 */
function _emulsify_copy_files(array $files = array(), $destination_path = '') {

  // Check for invalid settings and return an error.
  if (!is_array($files) || !is_string($destination_path) || empty($destination_path)) {
    return _emulsify_notify_fail('', "Invalid parameter passed to _emulsify_copy_files().");
  }

  // The $files parameter can be empty and valid, return success.
  if (empty($files)) {
    return TRUE;
  }

  // Copy desired files.
  foreach ($files as $files_to_copy) {
    $status = drush_copy_dir(__DIR__ . DIRECTORY_SEPARATOR . $files_to_copy, $destination_path . DIRECTORY_SEPARATOR . $files_to_copy);

    // Check if copy succeeded, if not, return FALSE.
    if (!$status) {
      return FALSE;
    }
  }

  // Return success.
  return TRUE;
}

/**
 * Rename files.
 *
 * @param string $theme_path
 *   A string representing the destination theme path.
 * @param string $machine_name
 *   A string that will be used in file names.
 * @param array $files_to_rename
 *   An array that represents the files to be processed.  The array is expected
 *   to be provided as an indexed array of relative files paths.
 *
 * @return boolean
 *   A boolean representing success or failure of the rename.
 */
function _emulsify_rename_files($theme_path, $machine_name, array $files_to_rename = array()) {
  foreach ($files_to_rename as $file_to_rename_path) {
    $file_original_path = $theme_path . DIRECTORY_SEPARATOR . $file_to_rename_path;
    $file_new_path = $theme_path . DIRECTORY_SEPARATOR . str_replace('emulsify', $machine_name, $file_to_rename_path);
    drush_op('rename', drush_normalize_path($file_original_path), drush_normalize_path($file_new_path));
  }
  return TRUE;
}

/**
 * Replace strings in a file.
 *
 * @param string $file_path
 *   A string representing the original file path to have replacements
 *   performed on.
 * @param array $find
 *   An array representing the search for values in the replacement process.
 * @param array $replace
 *   An array that will replace the $find strings.
 *
 * @return boolean
 *   A boolean representing success or failure of the replacement.
 */
function _emulsify_file_str_replace($file_path, array $find, array $replace) {
  $file_path = drush_normalize_path($file_path);
  $file_contents = file_get_contents($file_path);
  $file_contents = str_replace($find, $replace, $file_contents);
  file_put_contents($file_path, $file_contents);
  return TRUE;
}

/**
 * Validate that a path is writeable, creating the directory if necessary.
 *
 * @param string $path
 *   A string representing the path to verify exists and is writeable.
 *
 * @return boolean
 *   A boolean representing success or failure.
 */
function _emulsify_validate_path($path) {
  // Check for succees, if not, log the error and return FALSE.
  $return = file_prepare_directory($path, FILE_CREATE_DIRECTORY);

  if ($return === FALSE) {
    _emulsify_notify_fail($path);
  }

  return $return;
}

/**
 * Validate that a path is empty.
 *
 * @param string $path
 *   A string representing the path to verify is empty.
 *
 * @return boolean
 *   A boolean representing if the path is empty or not.
 */
function _emulsify_validate_path_is_empty($path) {

  if (!is_readable($path)) {
    return FALSE;
  }

  return (count(scandir($path)) === 2);
}

/**
 * Notifies the user of failure.
 *
 * @param string $path
 *   An optional string representing the path that failed.  This function can
 *   be used to just send a message to the user without path replacements.
 * @param string $message
 *   An optional string to replace the default message.
 *
 * @return boolean
 *   Always return false in the case we use this function as a return value.
 */
function _emulsify_notify_fail($path = '', $message = '') {

  // Set a default message for the most common error.
  if (empty($message)) {
    // Notify user of the path write error.
    $message = 'There was an error writting to "!path".  This is normally due to permissions on one of the base directories or "!path" directory not allowing the web server to write data.  You can use the "chmod" command to implement either a temporary or permanent fix for this.';
  }

  // Set the path if one was passed.
  if (!empty($path) && is_string($path)) {
    $message = dt($message, array(
      '!path' => $path,
    ));
  }

  drush_print($message);

  // We return false here to represent failure.
  return FALSE;
}

/**
 * Notifies the user of success.
 *
 * @param string $human_readable_name
 *   A string that will be returned to the user as their theme name.
 * @param string $theme_path
 *   A string that will show where to find their new theme.
 *
 * @return boolean
 *   Always TRUE in the case we want to use this function as a return value.
 */
function _emulsify_notify_success($human_readable_name, $theme_path) {
  // Notify user of the newly created theme.
  $message = 'Successfully created the Emulsify theme "!name" created in: !path, you can now run \'yarn\' or \'yarn install\' or \'npm install\' to install the node modules.';

  $message = dt($message, array(
    '!name' => $human_readable_name,
    '!path' => $theme_path,
  ));

  drush_print($message);

  // We return true here to represent success.
  return TRUE;
}
