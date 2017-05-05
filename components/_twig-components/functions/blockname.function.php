<?php
/**
 * @file
 * Add "classes" function for Pattern Lab.
 */

$function = new Twig_SimpleFunction('classes', function ($base_class, $modifiers = array(), $blockname = '') {
  $classes = array();
  $classes[] = $base_class;
  if (isset($modifiers) && is_array($modifiers)) {
    foreach ($modifiers as $modifier) {
      $classes[] = $base_class . '--' . $modifier;
    };
  }
  if ($blockname) {
    $classes[] = $blockname . '__' . $base_class;
  }
  return implode(' ', $classes);
});
