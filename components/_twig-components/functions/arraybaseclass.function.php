<?php
/**
 * @file
 * Add "arraybaseclass" function for Pattern Lab.
 *
 * Adds a baseclass to every item in the array.
 */

$function = new Twig_SimpleFunction('arraybaseclass', function ($array, $desired_array_key, $baseclass, $string_key = NULL) {
  $new_array = $array;
  foreach ($array as $key => $value) {
    if (is_array($value)) {
      $new_array[$key][$desired_array_key] = $baseclass;
    }
    elseif (!empty($string_key)) {
      $new_array[$key] = array();
      $new_array[$key][$desired_array_key] = $baseclass;
      $new_array[$key][$string_key] = $value;
    }
  }
  return $new_array;
});
