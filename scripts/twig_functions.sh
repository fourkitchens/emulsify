#!/bin/bash
# Link contrib twig functions into the components directory

# First we need to find out whether this is inside a Drupal install or standalone Emulsify
if [ -f ../../../../vendor/drupal-pattern-lab/bem-twig-extension/bem.function.php ]
then
  # Drupal install
  VENDORDIR=../../../../vendor
elif [ -f vendor/drupal-pattern-lab/bem-twig-extension/bem.function.php ]
then
  # Standalone
  VENDORDIR=vendor
elif [ -f ../../../vendor/drupal-pattern-lab/bem-twig-extension/bem.function.php ]
then
  # Composer-less Drupal
  VENDORDIR=../../../vendor
else
  # No vendor directory found
  echo "Vendor directory not found. Please run composer install."
fi

# If we found a vendor directory, copy the twig functions into place
if [ $VENDORDIR ]
then
  # Array of twig functions to copy, starting from the vendor directory
  twig_functions=(
    "drupal-pattern-lab/add-attributes-twig-extension/add_attributes.function.php"
    "drupal-pattern-lab/bem-twig-extension/bem.function.php"
  )

  # Create symlinks for all contrib twig functions
  for i in "${twig_functions[@]}"
  do
    cp $VENDORDIR/$i ./components/_twig-components/functions/.
  done
fi
