// jquery.teletype
// depends on lettering.js
(function($) {

  var Teletype = function(el, options) {
    this.el = el;
    this.opts = $.extend({}, $.fn.teletype.defaults, options);
    this.containers = $(el).find(this.opts.selector);

    this.init();
  };

  Teletype.prototype.init = function() {
    this.containers.addClass(this.opts.invisClass);
    if ( this.opts.autoStart ) {
      this.start();
    }
  };

  Teletype.prototype.start = function() {
    var opts = this.opts;
    var _this = this;
    var now = new Date();
    $(this.el).each(function() {
      var chars = $(this).find(opts.selector).lettering().find('span').addClass(opts.invisClass);
      var letterLength = chars.length;
      var delay = opts.delay || ( opts.speed / letterLength );
      chars.each(function(i) {
        var span = $(this);
        requestAnimationFrame(function removeInvisible() {
          if ( new Date() - now >= delay * i ) {
            span.removeClass(opts.invisClass).parent().removeClass(opts.invisClass);
          } else if ( ! opts.stop() ) {
            requestAnimationFrame(removeInvisible);
          }
        });
      });
    });
  };

  Teletype.prototype.options = function(key, value) {
    if ( typeof key === 'object' ) {
      for ( var p in key ) {
        this.options(p, key[p]);
      }
      return;
    }
    if ( this.opts[key] ) {
      this.opts[key] = value;
    }
  };

  Teletype.prototype.cleanup = function() {
    this.containers.each(function() {
      var el = $(this);
      el.html(el.text());
    }).addClass(this.opts.invisClass);
  };

  $.fn.teletype = function(method, key, value) {

    if ( typeof method === 'string' ) {
      return this.each(function() {
        var plugin = $.data(this, 'plugin_teletype');
        if ( plugin ) {
          if ( $.isFunction(plugin[method]) ) {
            plugin[method](key, value);
          } else {
            throw new Error('The ' + method + ' method does not exist on jquery.teletype');
          }
        }
      });
    } else if ( ! method || typeof method === 'object' ) {
      return this.each(function() {
        if ( ! $.data(this, 'plugin_teletype') ) {
          $.data(this, 'plugin_teletype', new Teletype(this, method));
        }
      });
    }
  };

  $.fn.teletype.defaults = {
    speed: 3e3,
    selector: ':not(:has(*), button)',
    invisClass: 'invisible',
    autoStart: false,
    stop: $.noop,
    delay: 12 // null to calculate based on length
  };

})(jQuery);