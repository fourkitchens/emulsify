<?php
// Bring Drupal filters in just so Pattern Lab doesn't bork.

$filter = new Twig_SimpleFilter('without', function ($string) {
    return $string;
});

?>
