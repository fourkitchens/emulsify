/*
* Reload Scripts on page (required for attach_library)
*
*/
const d = document;
// Get body tag.
const head = d.getElementsByTagName('body')[0];
// Get scripts within the body.
const scripts = head.querySelectorAll('script');
let done = 0;

function async(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  if (callback) {
    script.addEventListener(
      "load",
      e => {
        callback(null, e);
      },
      false
    );
  }
  head.appendChild(script);
}

scripts.forEach(element => {
  // If the script has the data-name attribute.
  if (element.dataset.name) {
    async(element.dataset.src, () => {
      if (typeof Drupal === 'object' && typeof Drupal.attachBehaviors === 'function') {
        // Only run attachBehaviors once.
        if (done === 0) {
          Drupal.attachBehaviors(document);
          done = 1;
        }
      }
    });
  }
});
