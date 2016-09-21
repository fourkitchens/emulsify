#! /bin/sh

# Prepare the Pattern Lab settings file for installation
if [ ! -d pattern-lab ]
  then
    composer create-project pattern-lab/edition-twig-standard pattern-lab
    rm -rf pattern-lab/source
    ln -s ../components pattern-lab/source
fi

# Install Node dependencies
if [ ! -d node_modules ]
  then
    npm install
fi
