<?php
/**
 * @file
 * Add "link" function for Pattern Lab.
 */

if (!class_exists('Drupal')) {
  $function = new Twig_SimpleFunction('link', function ($string) {
    return $string;
  });
}
