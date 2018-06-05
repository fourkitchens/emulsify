<?php
/**
 * @file
 * Add "attach_library" function for Pattern Lab.
 */

$function = new Twig_SimpleFunction('attach_library', function ($string) {
  // Get Library Name from string.
  $libraryName = substr($string, strpos($string, "/") + 1);

  // Search dist root directory for library.
  $files = glob('dist/*/' . $libraryName . '/*.js');
  // Search dist nested directory for library.
  if (empty($files)) {
    $files = glob('dist/*/*/' . $libraryName . '/*.js');
  }
  // For each file, create an async script to insert to the Twig component.
  foreach($files as $jsPath) {
    $scriptString = '<script async src="/' . $jsPath . '"></script>';
    $stringLoader = \PatternLab\Template::getStringLoader();
    $output = $stringLoader->render(array("string" => $scriptString, "data" => []));
    return $output;
	}
}, array('is_safe' => array('html')));
