/**
 * @file
 * Default javascript configuration for alumni theme.
 *
 * Basically used for just starting up javascript libraries or short pieces of
 * code. If a block of JS code gets longer then 10 or so lines it probably
 * should be moved into its own file.
 */
;(function($) {

  'use strict';

  Drupal.behaviors.emulsifyConfiguration = {
    attach: function (context, settings) {

      // Configuration that should only be ran once globally.
      $('body').once('emulsify-configuration-global').each(function () {
        // Init accordions.
        $('.m-accordion-item').accordion();
      });

    }
  };

})(jQuery);
