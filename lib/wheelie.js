(function( $ ){
	if (!$.thinkLiamThink) {
      $.thinkLiamThink = {};
  };
  
	$.thinkLiamThink.wheelie = function ( elements, args, options ) {
    var base = this;
   
		base.initialize = function() {
			base.options = $.extend({}, $.thinkLiamThink.wheelie.defaultOptions, options);
			base.radius = args.radius;
			base.center_x = args.center_x;
			base.center_y = args.center_y;
			return base;
		}
		
		base.determinElements = function() {
			var old_elements = [];
			base.$elements = elements;
			base.$elements.each( function() { 
				$this_element = $(this);
				if ( $this_element.data('thinkLiamThink.wheelie') != undefined ) {
					if ($this_element.data('thinkLiamThink.wheelie').$elements != base.$elements) {
						old_elements.push($this_element.data('thinkLiamThink.wheelie').$elements)
					}
				}
			});
	    base.$elements.data( "thinkLiamThink.wheelie", base );
			base.elements_length = base.$elements.size();
			return base;
		}
		
		base.initialize_style = function() { 
			base.$elements.each( function() { 
				var $element = $(this);
				var offset = $element.offset();
				$element.css(offset);
			});
			base.$elements.css('position', 'absolute');
			return base;
		}
				
    base.execute = function () {
			base.$elements.each( function(index) { 
				var $element = $(this);
				var width = $element.width();
				var height = $element.height();
								
				$element.animate({
					left: base.radiusOfIndex(index, 'cos') - ( width / 2 ) + base.center_x,
					top: base.radiusOfIndex(index, 'sin') - ( height / 2 ) + base.center_y
				}, 250);
			});
			return base.$elements;
		};
		
		base.radiusOfIndex = function (index, sin_or_cos) { 
			return Math.round( base.radius * base.unitRadiusOfIndex(index, sin_or_cos) );
		}
		
		base.unitRadiusOfIndex = function (index, sin_or_cos) {
			var value = 0;
			var y_modifier = 1;
			if (sin_or_cos == 'sin') {
				if (base.options.invert_y_axis) { y_modifier = -1; }
				value = y_modifier * Math.sin( base.angleFromIndex(index) ); 
			} 
			else if (sin_or_cos == 'cos') {
				value = Math.cos( base.angleFromIndex(index) );
			}
			return value;
		};

		base.angleFromIndex = function(index) { 
			var rotate_modifier = 1
			if (base.options.reverse_rotation) { rotate_modifier = -1 }
			return rotate_modifier * (index / base.elements_length) * (2 * Math.PI) + base.options.radians_to_rotate_by;
		};
		
		base.initialize().determinElements().initialize_style();
		return base.execute();
    
	};
	
	// Default Options
	$.thinkLiamThink.wheelie.defaultOptions = {
			// By default, y increases going down the screen.  
			// Set to true without other options for standard unit circle layout
      invert_y_axis: false,

			// Rotate the wheel by radians (Math.PI / 2 is a quarter turn, for example)
			radians_to_rotate_by: 0,
			
			// By default, wheelie distributes elements in a clockwise fashion.
			// (None that invert_y_axis flips this)
			reverse_rotation: false
  };
  
	
	// Actual plugin
  $.fn.wheelie = function ( args, options ) {
      return (new $.thinkLiamThink.wheelie(this, args, options));
  };
  
})( jQuery );