<?php
/**
 * @file
 * Add "t" filter for Pattern Lab.
 *
 * Bring Drupal filters in just so Pattern Lab doesn't bork.
 */

$filter = new Twig_SimpleFilter('t', function ($string, $array = array()) {
  if (is_string($string) && is_array($array)) {
    $haystack = $string;
    foreach ($array as $needle => $replace) {
      $haystack = str_replace($needle, $replace, $haystack);
    }
    return $haystack;
  }
});
