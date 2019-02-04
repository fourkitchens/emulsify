/**
 * @file
 * A JavaScript file containing the main menu functionality (small/large screen)
 *
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function tabs() {
  const el = document.querySelectorAll('.tabs');
  const tabNavigationLinks = document.querySelectorAll('.tabs__link');
  const tabContentContainers = document.querySelectorAll('.tabs__tab');
  let activeIndex = 0;

  /**
   * goToTab
   * @description Goes to a specific tab based on index. Returns nothing.
   * @param {Number} index The index of the tab to go to
   */
  function goToTab(index) { // eslint-disable-line func-names
    if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
      tabNavigationLinks[activeIndex].classList.remove('is-active');
      tabNavigationLinks[index].classList.add('is-active');
      tabContentContainers[activeIndex].classList.remove('is-active');
      tabContentContainers[index].classList.add('is-active');
      activeIndex = index;
    }
  }

  /**
   * handleClick
   * @description Handles click event listeners on each of the links in the
   *   tab navigation. Returns nothing.
   * @param {HTMLElement} link The link to listen for events on
   * @param {Number} index The index of that link
   */
  function handleClick(link, index) { // eslint-disable-line func-names
    link.addEventListener('click', (e) => {
      e.preventDefault();
      goToTab(index);
    });
  }

  /**
   * init
   * @description Initializes the component by removing the no-js class from
   *   the component, and attaching event listeners to each of the nav items.
   *   Returns nothing.
   */
  Array.from(el).forEach((item) => {
    item.classList.remove('no-js');
  });

  Array.from(tabNavigationLinks).forEach((tabNavigationLink, i) => {
    const link = tabNavigationLink;
    handleClick(link, i);
  });
}());
