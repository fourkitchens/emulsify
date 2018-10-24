#!/usr/bin/env node
/**
 * Install Pattern Lab.
 */
const shell = require("shelljs");

shell.echo("Let's install PATTERN LAB.");
shell.rm('-rf', 'pattern-lab');
shell.exec('composer create-project -n pattern-lab/edition-twig-standard pattern-lab')
shell.rm('-rf', 'pattern-lab/source');
shell.ln('-s', '../components', 'pattern-lab/source')
shell.exit();
