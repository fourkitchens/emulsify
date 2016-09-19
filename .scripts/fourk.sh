#! /bin/sh

# Prepare the Pattern Lab settings file for installation
if [ ! -d vendor/pattern-lab/edition-twig-standard/vendor ]
  then
    cd ./vendor/pattern-lab/edition-twig-standard; composer install
    rm -rf ./config/config.yml
    ln -s ../../../../pattern-lab-config.yml ./config/configtest.yml
fi
