<?php
/**
 * @file
 * Add "add_attributes" function for Pattern Lab & Drupal
 */

use Drupal\Core\Template\Attribute;

$function = new Twig_SimpleFunction('add_attributes', function ($context, $additional_attributes = []) {
  if (class_exists('Drupal')) {
    $attributes = new Attribute();

    if (!empty($additional_attributes)) {
      foreach ($additional_attributes as $key => $value) {
        if (!is_array($value)) {
          if (is_string($value)) {
            $value = [$value];
          }
          else {
            continue;
          }
        }
        // Merge additional attribute values with existing ones.
        if ($context['attributes']->offsetExists($key)) {
          $existing_attribute = $context['attributes']->offsetGet($key)->value();
          $value = array_merge($existing_attribute, $value);
        }

        $context['attributes']->setAttribute($key, $value);
      }
    }

    // Set all attributes.
    foreach($context['attributes'] as $key => $value) {
      $attributes->setAttribute($key, $value);
      // Remove this attribute from context so it doesn't filter down to child
      // elements.
      $context['attributes']->removeAttribute($key);
    }

    return $attributes;
  }
  else {
    $attributes = [];

    foreach ($additional_attributes as $key => $value) {
      if (is_array($value)) {
        $attributes[] = $value[0];
      }
      else {
        $attributes[] = $key . '="' . $value . '"';
      }
    }

    return implode(' ', $attributes);
  }

}, array('needs_context' => true, 'is_safe' => array('html')));
