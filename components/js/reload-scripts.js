/*
* Reload Scripts on page (required for attach_library)
*
*/
const d = document;
// Get body tag.
const head = d.getElementsByTagName('body')[0];
// Get scripts within the body.
const scripts = head.querySelectorAll('script');
const scriptsArray = [];

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
    const scriptSrc = element.dataset.src;
    if (!scriptsArray.includes(scriptSrc)) {
      async(scriptSrc, () => {
        if (typeof Drupal === 'object' && typeof Drupal.attachBehaviors === 'function') {
          const behaviors = Object.values(Drupal.behaviors);
          // Only run attachBehaviors once.
          behaviors.forEach(behavior => {
            Drupal.attachBehaviors(document);
          });
        }
      });
      scriptsArray.push(scriptSrc);
    }
  }
});
