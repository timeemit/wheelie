$(document).ready(function(){
	$('#collection a').wheelie({radius:50, center_x:100, center_y:100});
	$('#wild a').wheelie({radius:50, center_x:100, center_y:100});

	$('#barrel_roll').click(function(){
		$('#barrel_roll a').wheelie({radius:50, center_x:120, center_y:50}) 
	});
		
	$('#clockify').click(function(){
		$('#clockify span').wheelie({radius:50, center_x:70, center_y:60}, {radians_to_rotate_by: Math.PI / 6 - Math.PI / 2}) 
	});

	$('#collection a, #wild a').click(function(){
		var $this = $(this);
		var selector = '';
		if ($this.parent().attr('id') == 'collection') {
			selector = '#wild';
		}
		else if ($this.parent().attr('id') == 'wild') {
			selector = '#collection';
		}
		$(selector).append($this).children('a').wheelie();
	});	
	
	$('#transform_roller a').click(function(){
		var $set = $('#transform_roller a');
		var callback = function(){
			var center_x = $set.data('thinkLiamThink.wheelie').center_x;
			var radians = $set.data('thinkLiamThink.wheelie').options.radians_to_rotate_by;
			if ( center_x < 550 ) {
				$set.wheelie({center_x: center_x + 10}, 
					{callback_function: callback, radians_to_rotate_by: radians + Math.PI / 16, animation_easing: 'linear'});
			}
		};
	  $set.wheelie({radius:50, center_x:70, center_y:50}, 
			{
				radians_to_rotate_by: - Math.PI / 2,
				callback_function: callback
			}
		);
	});
});
