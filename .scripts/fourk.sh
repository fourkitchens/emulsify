#! /bin/sh

# Prepare the Pattern Lab settings file for installation
if [ ! -f vendor/pattern-lab/core/config/config.yml ]
  then
    ln -s ../../../../pattern-lab-config.yml ./vendor/pattern-lab/core/config/config.yml
fi
