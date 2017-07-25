<?php
/**
 * @file
 * Add "bem" function for Pattern Lab & Drupal
 */

use Drupal\Core\Template\Attribute;

//$function = new Twig_SimpleFunction('bem', function ($base_class = '', $modifiers = array(), $blockname = '', $additional_classes = []) {
//  $bem = [];
//
//  // If using a blockname to override default class.
//  if ($blockname) {
//    // Set blockname class.
//    $bem[] = $blockname . '__' . $base_class;
//
//    // Set blockname--modifier classes for each modifier.
//    if (isset($modifiers) && is_array($modifiers)) {
//      foreach ($modifiers as $modifier) {
//        $bem[] = $blockname . '__' . $base_class . '--' . $modifier;
//      };
//    }
//  }
//  // If not overriding base class.
//  else {
//    // Set base class.
//    $bem[] = $base_class;
//    // Set base--modifier class for each modifier
//    if (isset($modifiers) && is_array($modifiers)) {
//      foreach ($modifiers as $modifier) {
//        $bem[] = $base_class . '--' . $modifier;
//      };
//    }
//  }
//
//  if (!empty($additional_classes)) {
//    foreach ($additional_classes as $additional_class) {
//      $bem[] = $additional_class;
//    }
//  }
//
//  if (class_exists('Drupal')) {
//    $classes = new Attribute();
//
//    if (!empty($bem)) {
//      foreach ($bem as $class) {
//        $classes->addClass($class);
//      }
//    }
//
//    return $classes;
//  }
//  else {
//    $classString = implode(' ', $bem);
//    $classesSafe = ' class="' . $classString . '"';
//    return $classesSafe;
//  }
//
//}, array('is_safe' => array('html')));

$function = new Twig_SimpleFunction('bem', function ($context, $base_class = '', $modifiers = array(), $blockname = '', $attributes = []) {
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

  // Add existing classes from attributes.
  if (isset($attributes['class'])) {
    foreach ($attributes['class'] as $class) {
      $classes[] = $class;
    }
  }

  if (class_exists('Drupal')) {
    if (!$attributes) {
      $attributes = new Attribute();
    }

    // Set new or override existing class attribute.
    if (!empty($classes)) {
      $attributes->setAttribute('class', $classes);
    }

    return $attributes;
  }
  else {
    $classString = implode(' ', $classes);
    $classesSafe = ' class="' . $classString . '"';
    return $classesSafe;
  }

}, array('needs_context' => true, 'is_safe' => array('html')));
