(function( $ ){

  $.fn.wheelie = function(center_x, center_y, radius) {
		elements_length = this.size();
		this.each( function() { 
			var $this = $(this);
			$this.css('position', 'absolute');
			var offset = $this.offset();
			$this.animate({
				left: 120,
				top: 120
			}, 12);
		});
	};
	
})( jQuery );