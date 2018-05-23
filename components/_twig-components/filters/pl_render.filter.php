<?php
/**
 * @file
 * Add "render" filter for Pattern Lab.
 *
 * Bring Drupal filters in just so Pattern Lab doesn't bork.
 */

$filter = new Twig_SimpleFilter('render', function ($string) {
  return $string;
});
