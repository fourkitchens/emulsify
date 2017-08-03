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
    // Set base--modifier class for each modifier.
    if (isset($modifiers) && is_array($modifiers)) {
      foreach ($modifiers as $modifier) {
        $classes[] = $base_class . '--' . $modifier;
      };
    }
  }

  foreach($context['attributes'] as $key => $value) {
    if ($key === 'class') {
      foreach ($value as $class) {
        $classes[] = $class;
      }

      $context['attributes']->removeAttribute($key);
    }
  }

  if (class_exists('Attribute')) {
    $attributes = new Attribute();

    if (!empty($classes)) {
      $attributes->setAttribute('class', $classes);
    }

    foreach($context['attributes'] as $key => $value) {
      if ($key !== 'class') {
        $attributes->setAttribute($key, $value);
        // Remove this attribute from context so it doesn't filter down to child
        // elements.
        $context['attributes']->removeAttribute($key);
      }
    }

    return $attributes;
  }
  else {
    $classString = 'class="' . implode(' ', $classes) . '"';
    return $classString;
  }

}, array('needs_context' => true, 'is_safe' => array('html')));
