(function () {

  'use strict';

  var videoLink = document.getElementById('video-overlay');
  var mainMenuToggle = document.getElementById('main-menu-toggle');

  // If Mobile, add active class (for transitions)
  // Where el is the DOM element you'd like to test for visibility
  function isHidden(el) {
    return (el.offsetParent === null);
  }

  // Menu Button Toggle
  if (isHidden(mainMenuToggle)) {
    videoLink.addEventListener('click', function (e) {
      // Video Content
      var overlay = document.createElement('div');
      overlay.setAttribute('class', 'video-modal');
      overlay.innerHTML = "<div class='video'><iframe src='" + videoLink.getAttribute('data-video') + "'></div>";
      document.body.appendChild(overlay);

      // Modal Background
      var overlayBg = document.createElement('div');
      overlayBg.setAttribute('class', 'modal-bg');
      document.body.appendChild(overlayBg);

      // Remove Modal when background is clicked
      overlayBg.addEventListener('click', function (e) {
        document.body.removeChild(overlay);
        document.body.removeChild(overlayBg);
      });

      e.preventDefault();
    });
  }


})();
