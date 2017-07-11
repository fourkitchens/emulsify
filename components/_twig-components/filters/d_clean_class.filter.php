<?php
/**
 * @file
 * Add "clean_class" filter for Pattern Lab.
 *
 * Bring Drupal filters in just so Pattern Lab doesn't bork.
 */

if (!class_exists('Drupal')) {
  $filter = new Twig_SimpleFilter('clean_class', function ($string) {
    return $string;
  });
}
