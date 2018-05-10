<?php
/**
 * @file
 * Add "kint" function for Pattern Lab.
 */

$function = new Twig_SimpleFunction('attach_library', function ($string) {
  return $string;
});
