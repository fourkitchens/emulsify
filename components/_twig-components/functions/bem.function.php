<?php
/**
 * @file
 * Add "bem" function for Pattern Lab & Drupal
 */

use Drupal\Core\Template\Attribute;

$function = new Twig_SimpleFunction('bem', function ($context, $base_class, $modifiers = array(), $blockname = '', $extra = array()) {
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

  // If extra non-BEM classes are added.
  if (isset($extra) && is_array($extra)) {
    foreach ($extra as $extra_class) {
      $classes[] = $extra_class;
    };
  }

  if (class_exists('Drupal')) {
    $attributes = new Attribute();

    // Iterate the attributes available in context.
    foreach($context['attributes'] as $key => $value) {
      // If there are classes, add them to the classes array.
      if ($key === 'class') {
        foreach ($value as $class) {
          $classes[] = $class;
        }
      }
      // Otherwise add the attribute straightaway.
      else {
        $attributes->setAttribute($key, $value);
      }

      // Remove the attribute from context so it doesn't trickle down to
      // includes.
      $context['attributes']->removeAttribute($key);
    }

    // Add class attribute.
    if (!empty($classes)) {
      $attributes->setAttribute('class', $classes);
    }

    return $attributes;
  }
  else {
    $attributes = 'class="' . implode(' ', $classes) . '"';
    return $attributes;
  }

}, array('needs_context' => true, 'is_safe' => array('html')));
