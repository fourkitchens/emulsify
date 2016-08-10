(function () {

  'use strict';

  var sidebarMenu = document.getElementById('sidebar-menu');
  var isActive = document.querySelectorAll('.active-link > a');

  // Add toggle class based on is-active child.
  for (var i = 0; i < isActive.length; i++) {
    var activeList = isActive[i].nextElementSibling;
    if (activeList) {
      var activeListLi = isActive[i].parentNode;
      var activeListCount = activeList.children.length;
      var sections = document.createElement('a');

      // Create "Sections" Link.
      sections.setAttribute('class', 'sidebar-menu__link is-active');
      sections.setAttribute('id', 'sidebar-menu__link');
      sections.innerHTML = 'Sections (' + activeListCount + ')';

      // Show Sections nav.
      sidebarMenu.classList.add('is-active');
      // Insert Sections button.
      activeListLi.insertBefore(sections, activeList);

      // Toggle sidebar list open/closed.
      sections.addEventListener('click', function (e) {
        var sidebarList = this.nextElementSibling;
        sidebarList.classList.toggle('is-visible');
        e.preventDefault();
      });
    }
  }

})();
