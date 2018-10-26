/*
* Reload Scripts on page (required for attach_library)
*
*/

// Get body tag.
const head = document.getElementsByTagName('body')[0];
// Get scripts within the body.
const scripts = head.querySelectorAll('script');

scripts.forEach((element) => {
  // If the script has the data-name attribute.
  if (element.dataset.name) {
    // Create new script element.
    const script = document.createElement('script');
    // Set src to script above.
    script.src = element.dataset.src;
    // Append to head.
    head.appendChild(script);
  }
});
