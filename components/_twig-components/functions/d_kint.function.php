<?php
/**
 * @file
 * Add "kint" function for Pattern Lab.
 */

if (!class_exists('Drupal')) {
  $function = new Twig_SimpleFunction('kint', function ($string) {
    return $string;
  });
}
