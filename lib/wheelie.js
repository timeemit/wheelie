(function( $ ){

  $.fn.wheelie = function(center_x, center_y, radius) {
		elements_length = this.size();
		this.each( function(index) { 
			var $this = $(this);
			$this.css('position', 'absolute');
			var width = $this.width();
			var height = $this.height();
			$this.animate({
				left: Math.round( radius * Math.cos((index + 1) / (elements_length * 2 * Math.PI)) ) - ( width / 2 ) + center_x ,
				top: Math.round( radius * Math.sin((index + 1) / (elements_length * 2 * Math.PI)) ) - ( height / 2 ) + center_y
			}, 12);
		});
		return this;
	};
	
})( jQuery );