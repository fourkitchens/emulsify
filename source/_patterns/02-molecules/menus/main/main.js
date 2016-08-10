(function () {

  'use strict';

  var bodyElement = document.querySelector('body');
  var mainMenuToggle = document.getElementById('main-menu-toggle');
  var mainMenu = document.getElementById('main-menu');
  var mainMenuList = document.getElementById('main-menu__list');
  var mainMenuClose = document.getElementById('main-menu__close');
  var mainMenuParent = document.querySelectorAll('.main-menu__item--with-child > a');
  var mainMenuBack = document.querySelectorAll('.main-menu__back');
  var resizeTimer;

  // If Mobile, add active class (for transitions)
  // Where el is the DOM element you'd like to test for visibility
  function isHidden(el) {
    return (el.offsetParent === null);
  }

  // Encapsulate resizing
  function menuTransition() {
    // Add and remove menu active (transition) class
    if (!isHidden(mainMenuToggle)) {
      mainMenu.classList.add('active');
    }
    else {
      mainMenu.classList.remove('active');
    }
  }

  // Run menuTransition() on resize
  window.addEventListener('resize', function () {
    // http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(menuTransition, 250);
  });

  // Run menuTransition() on load
  menuTransition();

  // Menu Button Toggle
  mainMenuToggle.addEventListener('click', function (e) {
    mainMenu.classList.toggle('is-visible');
    bodyElement.classList.toggle('menu-open');
    e.preventDefault();
  });

  // Menu Close Toggle
  mainMenuClose.addEventListener('click', function (e) {
    mainMenu.classList.toggle('is-visible');
    mainMenuList.className = ('main-menu__list');
    bodyElement.classList.toggle('menu-open');
    e.preventDefault();
  });

  function removeOpen() {
    var openItems = document.querySelectorAll('.open');
    if (openItems.length) {
      for (var o = 0; o < openItems.length; o++) {
        openItems[o].classList.remove('open');
      }
    }
  }

  function removeOpenChild() {
    var openChild = document.querySelectorAll('.open-child');
    if (openChild.length) {
      for (var c = 0; c < openChild.length; c++) {
        openChild[c].classList.remove('open-child');
      }
    }
  }

  // Mobile Click Menu Transition
  for (var i = 0; i < mainMenuParent.length; i++) {
    mainMenuParent[i].addEventListener('click', function (e) {
      var level = this.getAttribute('data-childLevel');
      var parent = this.parentNode;
      // Make parent active
      if (level === '1') {
        removeOpen();
        if (parent.classList) {
          parent.classList.add('open');
        }
        else {
          parent.className += ' ' + 'open';
        }
      }
      if (level === '2') {
        removeOpenChild();
        if (parent.classList) {
          parent.classList.add('open-child');
        }
        else {
          parent.className += ' ' + 'open-child';
        }
      }
      // Reset open items
      mainMenuList.className = ('main-menu__list');
      // Add is-active-LEVEL class for each section
      if (mainMenuList.classList) {
        mainMenuList.classList.add('is-active-' + level);
      }
      else {
        mainMenuList.className += ' ' + 'is-active-' + level;
      }
      e.preventDefault();
    });
  }

  // Mobile Menu Back button
  for (var r = 0; r < mainMenuBack.length; r++) {
    mainMenuBack[r].addEventListener('click', function (e) {
      var level = this.getAttribute('data-childLevel');
      if (level === '0') {
        removeOpen();
        removeOpenChild();
      }
      mainMenuList.className = ('main-menu__list');
      // Add is-active-LEVEL class for each section
      if (mainMenuList.classList) {
        mainMenuList.classList.add('is-active-' + level);
      }
      else {
        mainMenuList.className += ' ' + 'is-active-' + level;
      }
      e.preventDefault();
    });
  }

})();
