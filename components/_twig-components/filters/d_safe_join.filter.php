<?php
/**
 * @file
 * Add "safe_join" filter for Pattern Lab.
 *
 * Bring Drupal filters in just so Pattern Lab doesn't bork.
 */

if (!class_exists('Drupal')) {
  $filter = new Twig_SimpleFilter('safe_join', function ($string) {
    return $string;
  });
}
