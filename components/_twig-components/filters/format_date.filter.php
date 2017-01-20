<?php
/**
 * @file
 * Add "format_date" filter for Pattern Lab.
 *
 * Bring Drupal filters in just so Pattern Lab doesn't bork.
 */

$filter = new Twig_SimpleFilter('format_date', function ($string) {
  return $string;
});
