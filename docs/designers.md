## For Designers

Designers, this section is for you. It'll help get you prototyping in a way that will allow your work to be integrated easily with Drupal.

### Design Process for this project

For the design of this project we want to design systemically and share that design as live comps. We design using the [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) system.

* **Atoms** are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button.
* **Molecules** are where things start to get more tangible as we start combining atoms together. Example, a search form comprised of a label, input and submit button.
* **Organisms** allow us to combine molecules into something relatively complex, such as a distinct section of the interface. Example, the header or footer of a site.
* **Templates** consist mostly of groups of organisms stitched together to form pages. It’s here where we start to see the design coming together and start seeing things like layout in action. Example, article node page.
* **Pages** are specific instances of templates. Here, placeholder content is replaced with real representative content to give an accurate depiction of what a user will ultimately see.

We accomplish this by using [Pattern Lab 2](http://patternlab.io/) with Twig. Because both Pattern Lab and Drupal 8 use Twig for templates, this means that the design components that get built can be used directly by Drupal! 🎉

### Requirements

1. **Node 5.0 or higher**, preferrably installed using [NVM](https://github.com/creationix/nvm)
2. [**Gulp**](http://gulpjs.com/)
3. [**Composer**](https://getcomposer.org/)

_If you're having issues with requirements, see the troubleshooting section below._

### How to use Pattern Lab

Organizing components using the [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) system and seeing those components come to life in Pattern Lab is extremely rewarding. It's worth taking a few moments to read the [Pattern Lab documentation](http://patternlab.io/docs/index.html). Below are a few basic principles.

1. **Structure:** All components (all HTML, CSS, JS) are housed in the `components/_patterns` directory.
2. **Global mixins, code:** Code that is global belongs in `components/_patterns/00-base`. By default, there are files for mixins, variables, breakpoints, layout, and more.
3. **Building a component:** A component is commonly comprised of an HTML file (Twig in our case), a CSS file (Sass in our case) and possibly a Javascript file. `components/_patterns/01-atoms/02-text/00-headings/heading-1` is a good example of a simple h1 component. Please store all code for a component together inside the component's directory.
4. **Pattern-Lab Specific:** Pattern Lab allows you to use YML or JSON files to provide filler data in your components. You can also provide component notation via a markdown file. See `components/_patterns/01-atoms/06-buttons` for an example of both of these inside a component, as well as an example of easily [providing component variants](http://patternlab.io/docs/pattern-pseudo-patterns.html).
5. **Drupal-related:** You may notice that there are files not organized into components such as `_block.twig`, `_node.twig`. You can likely ignore these files for your work, but you can use this underscore-first file naming convention for any components that you *don't* want to show up in Pattern Lab.

### Troubleshooting

#### Node

1. `node -v` to check the version of node. If it returns a version number it is installed.
2. If you don't have node installed, see if you have nvm installed by running `command -v nvm`. (Most likely you don't have nvm installed.) If it returns `nvm` it is installed.
3. If nvm is not installed, run the [nvm install script](https://github.com/creationix/nvm#install-script), open a new Terminal window (closing the old one), then `command -v nvm` again to confirm that it is installed.
4. If `command -v nvm` fails, type `vi ~/.bash_profile` and see that the file that is opened in the Terminal has the following in it, `export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm`. To exit, type `:q` and return. (If you run into trouble, search for VIM help.)
5. Run `nvm install node` to install the latest version of node.

#### Composer

1. `composer about` will return a description of composer. If it doesn't, then you'll need to install it.
2. `cd ~` this puts you in Home folder. We'll install it here first and then move it.
3. `curl -sS https://getcomposer.org/installer | php` this installs composer.
4. `sudo mv composer.phar /usr/local/bin/composer` to move composer.phar and rename it to simply "composer". You will have to enter your password for this command.
