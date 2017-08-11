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
        if (is_array($value)) {
          foreach ($value as $index => $item) {
            // Handle bem() output.
            if ($item instanceof Attribute) {
              // Remove the item.
              unset($value[$index]);
              $value = array_merge($value, $item->toArray()[$key]);
            }
          }
        }
        else {
          // Handle bem() output.
          if ($value instanceof Attribute) {
            $value = $value->toArray()[$key];
          }
          elseif (is_string($value)) {
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
  // Pattern Lab.
  else {
    $attributes = [];

    foreach ($additional_attributes as $key => $value) {
      if (is_array($value)) {
        foreach ($value as $index => $item) {
          // Handle bem() output.
          if (strpos($item, $key . '=') !== FALSE) {
            parse_str($item, $result);
            // Remove the item.
            unset($value[$index]);
            // Strip surrounding quotes.
            $value[] = substr($result[$key], 1, -1);
          }
        }

        $attributes[] = $key . '="' . implode(' ', $value) . '"';
      }
      else {
        // Handle bem() output.
        if (strpos($value, $key . '=') !== FALSE) {
          $attributes[] = $value;
        }
        else {
          $attributes[] = $key . '="' . $value . '"';
        }
      }
    }

    return implode(' ', $attributes);
  }

}, array('needs_context' => true, 'is_safe' => array('html')));
