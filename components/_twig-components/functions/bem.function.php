<?php
/**
 * @file
 * Add "bem" function for Pattern Lab & Drupal
 */

$function = new Twig_SimpleFunction('bem', function (Twig_Environment $env, $context, $base_class, $modifiers = array(), $blockname = '') {
  $classes = array();
  // If using a blockname to override default class.
  if ($blockname) {
    // Set blockname class.
    $classes[] = $blockname . '__' . $base_class;
    // Set blockname--modifier classes for each modifier.
    if (isset($modifiers) && is_array($modifiers)) {
      foreach ($modifiers as $modifier) {
        $classes[] = $blockname . '__' . $base_class . '--' . $modifier;
      };
    }
  }
  // If not overriding base class.
  else {
    // Set base class.
    $classes[] = $base_class;
    // Set base--modifier class for each modifier
    if (isset($modifiers) && is_array($modifiers)) {
      foreach ($modifiers as $modifier) {
        $classes[] = $base_class . '--' . $modifier;
      };
    }
  }

  $classString = implode(' ', $classes);
  if (class_exists('Drupal')) {
    $context['attributes']->addClass($classString);
    return $context['attributes'];
  }
  else {
    $classesSafe = ' class="' . $classString . '"';
    return $classesSafe;
  }

}, array('needs_context' => true, 'needs_environment' => true, 'is_safe' => array('html')));
