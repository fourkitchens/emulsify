<?php
// Bring Drupal filters in just so Pattern Lab doesn't bork.


$filter = new Twig_SimpleFilter('clean_class', function ($string) {
    return $string;
});
