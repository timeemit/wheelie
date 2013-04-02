test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

module('angleFromIndex', {
	setup: function() {
		$( "#qunit-fixture" ).append('<div>A</div><div>B</div><div>C</div><div>D</div>');
		$children = $('#qunit-fixture div').wheelie({center_x: 10, center_y: 10, radius: 2});
	}
});

test('returns angles correctly', function() {
	var angleFromIndex = $children.data('thinkLiamThink.wheelie').angleFromIndex
		
	equal(angleFromIndex(0), 0, 'Angle of 1 is zero radians');
	equal(angleFromIndex(1), Math.PI / 2, 'Angle of 2 is half a radian');
	equal(angleFromIndex(2), Math.PI, 'Angle of 3 is a radian');
	equal(angleFromIndex(3), 3 * Math.PI / 2, 'Angle of 3 is accurate');
	equal(angleFromIndex(4), 2 * Math.PI, 'Angle of 4 is 2*PI ');
});

module('unitRadiusOfIndex', {
	setup: function() {
		$( "#qunit-fixture" ).append('<div>A</div><div>B</div><div>C</div><div>D</div>');
		$children = $('#qunit-fixture div').wheelie({center_x: 10, center_y: 10, radius: 2});
	}
});

test('returns radii correctly for sin', function() {
	var unitRadiusOfIndex = $children.data('thinkLiamThink.wheelie').unitRadiusOfIndex
		
	ok(Math.abs(unitRadiusOfIndex(0, 'sin')) < 0.000000000001, 'Sin of 0 radians is 0');
	equal(unitRadiusOfIndex(1, 'sin'), 1, 'Sin of half of a radian is 1');
	ok(Math.abs(unitRadiusOfIndex(2, 'sin')) < 0.000000000001, 'Sin of a radian is 0');
	equal(unitRadiusOfIndex(3, 'sin'), -1, 'Sin of 1.5 radians is -1');
	ok(Math.abs(unitRadiusOfIndex(4, 'sin')) < 0.000000000001, 'Sin of 2 radians is 0');
});

test('returns radii correctly for cos', function() {
	var unitRadiusOfIndex = $children.data('thinkLiamThink.wheelie').unitRadiusOfIndex
		
	equal(unitRadiusOfIndex(0, 'cos'), 1, 'Cos of 0 radians is 1');
	ok( Math.abs(unitRadiusOfIndex(1, 'cos')) < 0.000000000001, 'Cos of half of a radian is 0');
	equal(unitRadiusOfIndex(2, 'cos'), -1, 'Cos of a radian is -1');
	ok( Math.abs(unitRadiusOfIndex(3, 'cos')) < 0.000000000001, 'Cos of 1.5 radians is 0');
	equal(unitRadiusOfIndex(4, 'cos'), 1, 'Cos of 2 radians is 1');
});

module('wheelie without options set', {
	setup: function() {
		$( "#qunit-fixture" ).append('<div>A</div><div>B</div><div>C</div><div>D</div>');
		$children = $('#qunit-fixture div')
		$children.css('height', '2px');
		$children.css('width', '2px');		
		$children.wheelie({center_x: 10, center_y: 10, radius: 2});
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

waitTime = 300;

asyncTest('sets position of first element centered around (x,y) = (12,10)', function() {
  deepEqual($children.filter(':nth-child(1)').get(), $children.first().get(), 'selecting the first div');
	setTimeout(function() {
		equal($children.filter(':nth-child(1)').css('left'), '11px', 'first element has left at 11');
		equal($children.filter(':nth-child(1)').css('top'), '9px', 'first element has top at 9');
		start();
	}, waitTime);
});

asyncTest('sets position of second element centered around (x,y) = (10,12)', function() {
	setTimeout(function() {
		equal($children.filter(':nth-child(2)').css('left'), '9px', 'fourth element has left at 9');
		equal($children.filter(':nth-child(2)').css('top'), '11px', 'fourth element has top at 11');
		start();
	}, waitTime);

asyncTest('sets position of third element centered around (x,y) = (8,10)', function() {
	setTimeout(function() {
		equal($children.filter(':nth-child(3)').css('left'), '7px', 'third element has left at 7');
		equal($children.filter(':nth-child(3)').css('top'), '9px', 'third element has top at 9');
		start();
	}, waitTime);
});

asyncTest('sets position of fourth element centered around (x,y) = (10,8)', function() {
	deepEqual($children.filter(':nth-child(4)').get(), $children.last().get(), 'selecting the last div');
	setTimeout(function() {
		equal($children.filter(':nth-child(4)').css('left'), '9px', 'second element has left at 9');
		equal($children.filter(':nth-child(4)').css('top'), '7px', 'second element has top at 7');
		start();
	}, waitTime);
});

});