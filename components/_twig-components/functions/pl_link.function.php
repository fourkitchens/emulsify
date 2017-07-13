<?php
/**
 * @file
 * Add "link" function for Pattern Lab.
 */

$function = new Twig_SimpleFunction('link', function ($string) {
  return $string;
});
