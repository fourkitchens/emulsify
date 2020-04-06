// UNCOMMENT NEXT 2 LINES IF DRUPAL - see components/_meta/_01-foot.twig for attachBehaviors
// Drupal.behaviors.accordion = {
//   attach: function (context, settings) {

// REMOVE NEXT LINE IF DRUPAL
(function accordion() {
  // Set 'document' to 'context' if Drupal
  const accordionTerms = document.querySelectorAll('.accordion-term');
  const accordionDefs = document.querySelectorAll('.accordion-def');

  // If javascript, hide accordion definition on load
  function jsCheck() {
    Array.from(accordionDefs).forEach((accordionDef) => {
      if (accordionDef.classList) {
        accordionDef.classList.add('active');
        accordionDefs[0].previousElementSibling.classList.add('is-active');
      } else {
        accordionDef.className += ' active'; // eslint-disable-line no-param-reassign
        accordionDefs[0].previousElementSibling.classList.add('is-active');
      }
    });
  }

  jsCheck();

  // Accordion Toggle
  // Mobile Click Menu Transition
  Array.from(accordionTerms).forEach((accordionTerm) => {
    accordionTerm.addEventListener('click', function accordionClick(e) {
      const className = 'is-active';
      // Add is-active class
      if (this.classList) {
        this.classList.toggle(className);
      } else {
        const classes = this.className.split(' ');
        const existingIndex = classes.indexOf(className);

        if (existingIndex >= 0) {
          classes.splice(existingIndex, 1);
        } else {
          classes.push(className);
        }
        this.className = classes.join(' ');
      }
      e.preventDefault();
    });
  });
}()); // REMOVE IF DRUPAL

// UNCOMMENT IF DRUPAL
//   }
// };
