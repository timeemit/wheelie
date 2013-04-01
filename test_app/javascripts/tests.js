test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

module('wheelie', {
	setup: function() {
		$( "#qunit-fixture" ).append('<div>A</div><div>B</div><div>C</div><div>D</div>');
		$children = $('#qunit-fixture div')
		$children.css('height', '2px');
		$children.css('width', '2px');		
		$children.wheelie(10,10,2);
	}
});

test('has four div elements', function() {
	var $fixture = $( "#qunit-fixture" );
	equal($fixture.children('div').size(), 4, 'four div elemements are in the fixture');
});

test('sets css position to be absolute', function() {
	$children.each(function(){
		equal($(this).css('position'), 'absolute');
	});
});

test('sets css width to be specific', function() {
	$children.each(function(){
		equal($(this).css('width'), '2px');
	});
	$children.each(function(){
		equal($(this).css('height'), '2px');
	});
});


asyncTest('sets position of each element correctly', function() {
  deepEqual($children.filter(':nth-child(1)').get(), $children.first().get(), 'selecting the first div');
	deepEqual($children.filter(':nth-child(4)').get(), $children.last().get(), 'selecting the last div');
	setTimeout(function() {
		equal($children.filter(':nth-child(1)').css('left'), '9px', 'first element is centered around (x,y) = (11,10) with left at 10');
		equal($children.filter(':nth-child(1)').css('top'), '11px', 'first element is centered around (x,y) = (11,10) with top at 11');
		equal($children.filter(':nth-child(2)').css('left'), '9px', 'second element is centered around (x,y) = (10,11) with left at 9');
		equal($children.filter(':nth-child(2)').css('top'), '10px', 'second element is centered around (x,y) = (10,11) with top at 10');
		equal($children.filter(':nth-child(3)').css('left'), '8px', 'third element is centered around (x,y) = (9,10) with left at 8');
		equal($children.filter(':nth-child(3)').css('top'), '9px', 'third element is centered around (x,y) = (9,10) with top at 9');
		equal($children.filter(':nth-child(4)').css('left'), '9px', 'fourth element is centered around (x,y) = (10,9) with left at 9');
		equal($children.filter(':nth-child(4)').css('top'), '8px', 'fourth element is centered around (x,y) = (10,9) with top at 8');
		start();
	}, 25);
});