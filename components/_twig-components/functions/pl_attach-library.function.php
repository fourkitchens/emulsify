<?php
/**
 * @file
 * Add "attach_library" function for Pattern Lab.
 */

$function = new Twig_SimpleFunction('attach_library', function ($context, $string) {
  // Get Library Name.
  $libraryName = substr($string, strpos($string, "/") + 1);
  $files = glob('dist/*/' . $libraryName . '/' . $libraryName . '*.js');
  if (empty($files)) {
    $files = glob('dist/*/*/' . $libraryName . '/' . $libraryName . '*.js');
  }
  foreach($files as $jsPath) {
    $data = array("hello" => "world");
    $scriptString = '<script async src="/' . $jsPath . '"></script>';
    $stringLoader = \PatternLab\Template::getStringLoader();
    $output = $stringLoader->render(array("string" => $scriptString, "data" => $data));
    return $output;
	}
}, array('needs_context' => true, 'is_safe' => array('html')));
