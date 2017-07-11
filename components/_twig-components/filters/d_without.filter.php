<?php
/**
 * @file
 * Add "without" filter for Pattern Lab.
 *
 * Bring Drupal filters in just so Pattern Lab doesn't bork.
 */

if (!class_exists('Drupal')) {
  $filter = new Twig_SimpleFilter('without', function ($string) {
    return $string;
  });
}
