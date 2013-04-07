#Do a Wheelie!
Wheelie is a jQuery plugin that revolves a collection of jQuery objects around a given point with a specified radius.

Developed with jQuery 1.9.1 and tested QUnit 1.11.0

##How to work it
    $(selector).wheelie(args, options);

The args object requires the following to be defined with numerical values (no units necessary):

* `center_x`:  The x-coordinate of the circle's center.
* `center_y`:  The y-coordinate of the circle's center.
    _Pro-tip_: Don't forget that the DOM's y-axis extends downwards!
* `radius`: The distance from the circle's center that all the objects will rest at.
**_Note:_** The jQuery collection position css attribute is set to absolute, 
	so all of the coordinates are from the first parent element that has a position other than static.

The options object can have the following optionally set:

+ `radians_to_rotate_by`: Number (default is `0`).  
  Offset rotation in the clockwise direction.
+ `reverse_rotation`: Boolean (default is `false`).  
  Set to true for the standard unit circle layout.
  A positive `radians_to_rotate_by` argument will offset the circle in the counter-clockwise direction.
+ `animation_easing`: `'linear'` or `'swing'` (default is `'swing'`)
	Easing function used by jQuery's animate function.
+ `callback_function`: Function (default is jQuery.noop)
	A function to be called once the wheelie is complete.


##Examples

If you have `<div id='list'><div>A</div><div>B</div><div>C</div><div>D</div></div>` in your DOM.

    $('#id div).wheelie({center_x: 50, center_y: 100, radius: 25})

Will make the list look like:

` `D
C` `A
` `B

Where the center of the list is 50 pixels from the left of the window,
100 pixels from the top of the window, and the **_center_** of each div 
is 25 pixels from this center.

    $('#id div).wheelie({center_x: 80, center_y: 40, radius: 10}, 
    {radians_to_rotate_by: - Math.PI / 2})

Will create clock orientation, making the list look like:

` `A
D` `B
` `C

Where the center of the list is 80 pixels from the left of the window,
40 pixels from the top of the window, and the **_center_** of each div 
is 10 pixels from this center.

    $('#id div).wheelie({center_x: 80, center_y: 40, radius: 10}, 
    {reverse_rotation: true})

Will make the list look like:

` `B
C` `A
` `D

Where the center of the list is 80 pixels from the left of the window,
40 pixels from the top of the window, and the **_center_** of each div 
is 10 pixels from this center.

##Make it spin!
To see the demo implemented with tests just point your browser to `test_app/index.html`