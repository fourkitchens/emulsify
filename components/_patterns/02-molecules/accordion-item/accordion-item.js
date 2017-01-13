;(function ($, window, document, undefined) {

  'use strict';

  // Default options
  var pluginName = 'accordion',
      dataKey = 'plugin_' + pluginName;
  /**
   * The plugin constructor.
   */
  var Plugin = function(element, options) {
    // If there is not tabs element exit.
    if (element.length == 0) {
      return;
    }

    this.element = element;

    this.options = {
      speed: 200,
    }

    this.init();
  }

  // Public methods.
  Plugin.prototype = {

    /**
     * Initialization
     */
    init: function(options) {
      $.extend(this.options, options);
      var speed = this.options.speed;
      var $accordions = this.element;

      var n = 1;
      $accordions.each(function() {
        var $accordion = $(this);
        // Add starting accordian state, closed.
        $accordion.attr('data-accordion-state', 'is-closed');
        // label for accordion.
        var $label = $accordion.find('[data-accordion-component=label]');
        // Add aria.
        $label.attr({
          'aria-expanded': false,
          'aria-controls': 'collapsible-' + n,
          'tabindex': '0',
          'role':'button'
        });

        // Content for accordion.
        var $content = $accordion.find('[data-accordion-component=content]');
        // Add aria/
        $content.attr({
          'id': 'collapsible-' + n,
          'role': 'region',
          'aria-hidden': true,
          'data-accordion-state': 'is-closed'
        });

        $label.on('click', {accordion: $accordion, content: $content, speed: speed }, _clickAccordion);

        n++;
      });
    },

    /**
     * Remove the accordions javascript.
     */
    destroy: function() {
      var $accordions = this.element;

      $accordions.each(function() {
        var $accordion = $(this);
        $accordion.removeAttr('data-accordion-state');
        // label for accordion.
        var $label = $accordion.find('[data-accordion-component=label]');
        $label.removeAttr('aria-expanded aria-controls tabindex role');
        // Content for accordion.
        var $content = $accordion.find('[data-accordion-component=content]');
        $content.removeAttr('id role aria-hidden data-accordion-state style');
        // Unbind clickAccordion event.
        $label.off('click', _clickAccordion);
      });

      this.element.removeData(dataKey);
    }
  }
  // Private functions.

  /**
   * Click event on an accordion.
   */
  function _clickAccordion(e) {
    e.preventDefault();
    var $btn = $(this);
    var speed = e.data.speed;
    var $accordion = e.data.accordion;
    var $content = e.data.content;
    var state = $accordion.attr('data-accordion-state');

    // If the accordion is closed open it.
    if (state == 'is-closed') {

      $content.velocity('slideDown', {duration: speed});

      // Update aria.
      $content.attr('aria-hidden', 'false');
      $btn.attr({'aria-expanded': true});
      // Update state.
      $accordion.attr('data-accordion-state', 'is-open');
    }
    // If the accordion is open close it.
    else {
      $content
        .velocity('slideUp', {duration: speed})
        .attr('aria-hidden', 'true');
      $btn.attr({'aria-expanded': false});
      // Set the state to closed.
      $accordion.attr('data-accordion-state', 'is-closed');
    }
  }

  /*
   * Plugin wrapper, preventing against multiple instantiations and
   * return plugin instance.
   */
  $.fn[pluginName] = function (options) {
    var plugin = this.data(dataKey);

    // has plugin instantiated ?
    if (plugin instanceof Plugin) {
      // if have options arguments, call plugin.init() again
      if (typeof options !== 'undefined') {
        plugin.init(options);
      }
    } else {
      plugin = new Plugin(this, options);
      this.data(dataKey, plugin);
    }

    return plugin;
  };

})(jQuery, window, document);