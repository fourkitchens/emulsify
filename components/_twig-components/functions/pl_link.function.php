<?php
/**
 * @file
 * Simple "link" function for Pattern Lab to replicate Drupal functionality.
 */

$function = new Twig_SimpleFunction('link', function ($title, $url, $attributes = array()) {
  // Make it into an array if it is not already.
  if (!is_array($attributes)) {
    $attributes = [$attributes];
  }

  $attributes_string = '';

  // Create attributes.
  if (isset($attributes) && is_array($attributes)) {
    foreach ($attributes as $key => $value) {
      // handle BEM function differently than rest.
      if ($key == 'class') {
        $attributes_string .= $value . ' ';
      } else {
        $attributes_string .= $key . '="' . $value . '" ';
      }
    };
  }
  return '<a href="' . $url . '"' . $attributes_string . '>' . $title . '</a>';
}, array('is_safe' => array('html')));
