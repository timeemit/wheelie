(function( $ ){
  $.fn.wheelie = function(center_x, center_y, radius) {
		var elements_length = this.size();
		this.each( function(index) { 
			var $this = $(this);
			$this.css('position', 'absolute');
			var width = $this.width();
			var height = $this.height();
			$this.animate({
				left: ( radius * unitRadiusOfIndex(index, elements_length, 'cos') ) - ( width / 2 ) + center_x,
				top: ( radius * unitRadiusOfIndex(index, elements_length, 'sin') ) - ( height / 2 ) + center_y
			}, 250);
		});
		return this;
	};
	
	function unitRadiusOfIndex(index, final_index, cosOrSin) {
		if (cosOrSin == 'cos') {
			return Math.round( Math.sin( angleFromIndex(index, final_index) ) ); 
		} 
		else if (cosOrSin == 'sin') {
			return Math.round( Math.cos( angleFromIndex(index, final_index) ) );
		}
	}
	
	function angleFromIndex(index, final_index) { 
		return (index + 1) / (final_index * 2 * Math.PI)
	}
	
})( jQuery );