(function( $ ){
	if (!$.thinkLiamThink) {
      $.thinkLiamThink = {};
  };
  
	$.thinkLiamThink.wheelie = function ( elements, args, options ) {
    var base = this;
   
		base.initialize = function() {
			base.options = $.extend({}, $.thinkLiamThink.wheelie.defaultOptions, options);
			return base;
		}
		
		base.determineElements = function() {
			base.$elements = elements;
			base.$elements.each( function() { 
				$this_element = $(this);
				if ( $this_element.data('thinkLiamThink.wheelie') != undefined ) {
					if ($.inArray($this_element, $this_element.data('thinkLiamThink.wheelie').$elements)) {
						$this_element.data('thinkLiamThink.wheelie').removeFromWheel($this_element);
					}
				}
			});
			return base;
		}
		
		base.determineDimensions = function() {
			var radius, center_x, center_y;
			var wheelie = base.$elements.data('thinkLiamThink.wheelie');
			if (typeof args == 'object') { 
				radius = args.radius;
				center_x = args.center_x;
				center_y = args.center_y;
			}
			base.radius = radius || wheelie.radius;
			base.center_x = center_x || wheelie.center_x;
			base.center_y = center_y || wheelie.center_y;;
			return base;
		}
		base.removeFromWheel = function($element) {
			base.$elements = base.$elements.not($element);
			return base.animate(false);
		}
		
		base.initialize_style = function() { 
			base.$elements.each( function() { 
				var $element = $(this);
				var offset = $element.position();
				$element.css(offset);
			});
			base.$elements.css('position', 'absolute');
			return base;
		}
				
    base.animate = function (should_be_queued) {
			var callback = $.noop;
			base.animations_complete = 0;
			if (should_be_queued == null || should_be_queued) { callback = base.increment_animations_complete }
			base.increment_animations_complete;
			base.$elements.each( function(index) { 
				var $element = $(this);
				var width = $element.width();
				var height = $element.height();
								
				$element.animate({
					left: base.radiusOfIndex(index, 'cos') - ( width / 2 ) + base.center_x,
					top: base.radiusOfIndex(index, 'sin') - ( height / 2 ) + base.center_y
				}, {duration: 250, queue: should_be_queued, complete: callback, easing: base.options.animation_easing});
			});
	
			return base.$elements;
		};
		
		base.increment_animations_complete = function() {
			if (++base.animations_complete == base.$elements.length) {
				base.options.callback_function();
				base.animations_complete = 0; 
				base.options.collback_function = $.noop;
			}
		}
		
		base.radiusOfIndex = function (index, sin_or_cos) { 
			return Math.round( base.radius * base.unitRadiusOfIndex(index, sin_or_cos) );
		}
		
		base.unitRadiusOfIndex = function (index, sin_or_cos) {
			var value = 0;
			if (sin_or_cos == 'sin') {
				value = Math.sin( base.angleFromIndex(index) ); 
			} 
			else if (sin_or_cos == 'cos') {
				value = Math.cos( base.angleFromIndex(index) );
			}
			return value;
		};

		base.angleFromIndex = function(index) { 
			var rotate_modifier = 1
			if (base.options.reverse_rotation) { rotate_modifier = -1; }
			return rotate_modifier * (index / base.$elements.size()) * (2 * Math.PI) + base.options.radians_to_rotate_by;
		};
		
		base.initialize().determineElements().determineDimensions();
	  base.$elements.data( "thinkLiamThink.wheelie", base );
	  return base.initialize_style().animate()    
	};
	
	// Default Options
	$.thinkLiamThink.wheelie.defaultOptions = {
			// Rotate the wheel by radians (Math.PI / 2 is a quarter turn, for example)
			radians_to_rotate_by: 0,
			
			// By default, wheelie distributes elements in a clockwise fashion.
			// (None that invert_y_axis flips this)
			reverse_rotation: false,
			
			// Function to be called at the end of the animation
			callback_function: $.noop,
			
			// Easing function used by jQuery's animate function.
			animation_easing: 'swing'
  };
  
	
	// Actual plugin
  $.fn.wheelie = function ( args, options ) {
      return (new $.thinkLiamThink.wheelie(this, args, options));
  };
  
})( jQuery );