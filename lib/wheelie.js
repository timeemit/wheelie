$(document).ready(function(){alert('loaded wheelie!');});

(function( $ ){

  $.fn.wheelie = function(center_x, center_y, radius) {
		alert(center_x + ' ' + center_y + ' ' + radius)
	}
	
})( jQuery );