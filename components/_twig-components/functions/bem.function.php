<?php
/**
 * @file
 * Add "bem" function for Pattern Lab & Drupal
 */

use Drupal\Core\Template\Attribute;

$function = new Twig_SimpleFunction('bem', function ($context, $base_class, $modifiers = array(), $blockname = '') {
  $classes = [];

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

  if (class_exists('Drupal')) {
    if (!isset($context['attributes'])) {
      $attributes = new Attribute();
    }
    else {
      $attributes = clone $context['attributes'];
    }

    if (!empty($classes)) {
      foreach ($classes as $class) {
        $attributes->addClass($class);
      }
    }

    return $attributes;
  }
  else {
    $classString = implode(' ', $classes);
    $classesSafe = ' class="' . $classString . '"';
    return $classesSafe;
  }

}, array('needs_context' => true, 'is_safe' => array('html')));
