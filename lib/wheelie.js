(function( $ ){
	if (!$.thinkLiamThink) {
      $.thinkLiamThink = {};
  };
  
	$.thinkLiamThink.wheelie = function ( elements, args, options ) {
    var base = this;
    base.$elements = $(elements);
    base.$elements.data( "thinkLiamThink.wheelie" , base );

		base.radius = args.radius;
		base.center_x = args.center_x;
		base.center_y = args.center_y;
		base.elements_length = base.$elements.size();

    base.execute = function () {
			base.args = args;
			base.options = $.extend({}, $.thinkLiamThink.wheelie.defaultOptions, options);
			base.$elements.css('position', 'relative');
			base.$elements.each( function(index) { 
				var $element = $(this);
				var width = $element.width();
				var height = $element.height();
				$element.animate({
					left: - (base.radiusOfIndex(index, 'cos') - ( width / 2 ) + base.center_x),
					top: base.radiusOfIndex(index, 'sin') - ( height / 2 ) + base.center_y
				}, 250);
			});
			return $(elements);
		};
		
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
			return (index / base.elements_length) * (2 * Math.PI);
		};
		
		return base.execute();
    
	};
	
	// Default Options
	$.thinkLiamThink.wheelie.defaultOptions = {
      invert_y_axis: false
  };
  
	
	// Actual plugin
  $.fn.wheelie = function ( args, options ) {
      return (new $.thinkLiamThink.wheelie(this, args, options));
  };
  
})( jQuery );