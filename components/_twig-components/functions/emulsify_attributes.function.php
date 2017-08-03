<?php
/**
 * @file
 * Add "bem" function for Pattern Lab & Drupal
 */

use Drupal\Core\Template\Attribute;

$function = new Twig_SimpleFunction('emulsify_attributes', function ($context) {
  $attributes_r = [];

  foreach ($context['attributes'] as $key => $value) {
    if (is_array($value)) {
      $attributes_r[$key] = implode(' ', $value);
    }
    else {
      $attributes_r[$key] = $value;
    }
  }



  foreach($context['attributes'] as $attribute => $data) {

    // Remove this attribute from context so it doesn't filter down to child
    // elements.
    $context['attributes']->removeAttribute($attribute);
  }

  if (class_exists('Drupal')) {
    $attributes = new Attribute();

    // Set all attributes.
    foreach($attributes_r as $key => $value) {
      $attributes->setAttribute($key, $value);
      // Remove this attribute from context so it doesn't filter down to child
      // elements.
      $context['attributes']->removeAttribute($key);
    }

    return $attributes;

  }
  else {

//    return 'foo';

//    return [
//      'class' => ['foo']
//    ];
//    $classString = 'class="' . implode(' ', $classes) . '"';
//    return $classString;
    dsm($attributes_r);
    $attributes = [];

    foreach ($attributes_r as $attribute => $data) {
//      $data = implode(' ', (array) $data);
      $attributes[] = $attribute . '="' . $data . '"';
    }

    return implode(' ', $attributes);
  }

}, array('needs_context' => TRUE, 'is_safe' => array('html')));
