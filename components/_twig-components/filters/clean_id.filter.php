<?php
/**
 * @file
 * Add "clean_id" filter for Pattern Lab.
 *
 * Bring Drupal filters in just so Pattern Lab doesn't bork.
 */

$filter = new Twig_SimpleFilter('clean_id', function ($string) {
  return $string;
});
