/**
 * @file
 * A JavaScript file containing the main menu functionality (small/large screen)
 *
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth


// (function (Drupal) { // UNCOMMENT IF DRUPAL
//
//   Drupal.behaviors.mainMenu = {
//     attach: function (context) {

(function () { // REMOVE IF DRUPAL

  'use strict';

  // USE context instead of document IF DRUPAL
  var menu = document.getElementById('main-menu');
  var expand_menu = menu.getElementsByClassName('expand-sub');
  var toggle_expand = document.getElementById('toggle-expand');

  for (var i = 0; i < expand_menu.length; i++) {
    expand_menu[i].addEventListener('click', function (e) {
      var menu_item = e.currentTarget;
      var sub_menu = menu_item.nextElementSibling;

      menu_item.classList.toggle('opened');
      sub_menu.classList.toggle('open');
    });
  }

  toggle_expand.addEventListener('click', function (e) {
    // var toggle = e.currentTarget;

    toggle_expand.classList.toggle('menu-open');
    menu.classList.toggle('menu-open');
  });

})(); // REMOVE IF DRUPAL

// })(Drupal); // UNCOMMENT IF DRUPAL
