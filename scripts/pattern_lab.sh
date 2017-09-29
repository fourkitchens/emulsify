#!/bin/bash
# Install Pattern Lab

# Remove existing PL directory
rm -rf pattern-lab

# Install PL using Drupal Pattern Lab's Edition: https://github.com/drupal-pattern-lab/edition-php-twig-standard
composer create-project -n drupal-pattern-lab/edition-twig-standard pattern-lab

# Delete the default source directory
rm -rf pattern-lab/source

# Symlink our components directory to the source location we just deleted
ln -s ../components pattern-lab/source
