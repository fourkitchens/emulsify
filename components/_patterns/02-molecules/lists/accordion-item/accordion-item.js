// UNCOMMENT IF DRUPAL
// Drupal.behaviors.accordion = {
//   attach: function (context, settings) {

// REMOVE IF DRUPAL
(function () {

  'use strict';

  // If javascript, hide accordion definition on load
  function jsHideOnLoad(accordionDefs) {
    for (var i = 0; i < accordionDefs.length; i++) {
      if (accordionDefs[i].classList) {
        accordionDefs[i].classList.add('active');
      }
      else {
        accordionDefs[i].className += ' active';
      }
    }
  }

  // Set 'document' to 'context' if Drupal
  var accordionItems = document.querySelectorAll('.accordion-item');

  // Process each accordion item.
  for (var x = 0; x < accordionItems.length; x++) {
    // Set 'document' to 'context' if Drupal
    // Note: There can be more than one definition.
    var accordionDefs = accordionItems[x].querySelectorAll('.accordion-definition');

    // Hide accordion definitions on load
    jsHideOnLoad(accordionDefs);

    // Note: There can be more than one term.
    var accordionTerm = accordionItems[x].querySelectorAll('.accordion-term');

    // Accordion Toggle
    for (var y = 0; y < accordionTerm.length; y++) {
      accordionTerm[y].addEventListener('click', function (e) {
        var className = 'is-active';
        // Add is-active class
        if (this.classList) {
          this.classList.toggle(className);
        }
        else {
          var classes = this.className.split(' ');
          var existingIndex = classes.indexOf(className);

          if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
          }
          else {
            classes.push(className);
          }
          this.className = classes.join(' ');
        }
        e.preventDefault();
      });
    }
  }

  // If javascript, hide accordion definition on load
  function jsUnhideFirstAccordionItem(accordionDef) {
    if (accordionDef[0].classList) {
      accordionDef[0].classList.add('active');
      accordionDef[0].previousElementSibling.classList.add('is-active');
    }
    else {
      accordionDef[0].className += ' active';
      accordionDef[0].previousElementSibling.classList.add('is-active');
    }
  }

  // Set 'document' to 'context' if Drupal
  var accordions = document.querySelectorAll('.accordion');

  // Process each accordion.
  for (var z = 0; z < accordions.length; z++) {
    // Set 'document' to 'context' if Drupal
    // Note: There can be more than one definition.
    var accordionDef = accordions[z].querySelectorAll('.accordion-definition');

    // Hide accordion definitions on load
    jsUnhideFirstAccordionItem(accordionDef);
  }

// REMOVE IF DRUPAL
})();

// UNCOMMENT IF DRUPAL
//   }
// };
