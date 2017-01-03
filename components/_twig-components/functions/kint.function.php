<?php
/**
 * @file
 * Add "kint" function for Pattern Lab.
 */

$function = new Twig_SimpleFunction('kint', function ($string) {
  return $string;
});
