/**
 * @file
 * A JavaScript file containing the main menu functionality (small/large screen)
 *
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth


// (function (Drupal) { // UNCOMMENT IF DRUPAL.
//
//   Drupal.behaviors.mainMenu = {
//     attach: function (context) {

// REMOVE NEXT LINE IF DRUPAL.
(function mainMenu() {
  // Use context instead of document IF DRUPAL.
  const toggleExpand = document.getElementById('toggle-expand');
  const menu = document.getElementById('main-nav');
  const expandMenu = menu.getElementsByClassName('expand-sub');

  // Mobile Menu Show/Hide.
  toggleExpand.addEventListener('click', () => {
    toggleExpand.classList.toggle('toggle-expand--open');
    menu.classList.toggle('main-nav--open');
  });

  // Expose mobile sub menu on click.
  Array.from(expandMenu).forEach((expand) => {
    expand.addEventListener('click', (e) => {
      const menuItem = e.currentTarget;
      const subMenu = menuItem.nextElementSibling;

      menuItem.classList.toggle('expand-sub--open');
      subMenu.classList.toggle('main-menu--sub-open');
    });
  });
}()); // REMOVE IF DRUPAL.

// }(Drupal)); // UNCOMMENT IF DRUPAL.
