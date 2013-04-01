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

waitTime = 250;

asyncTest('sets position of first element centered around (x,y) = (12,10)', function() {
  deepEqual($children.filter(':nth-child(1)').get(), $children.first().get(), 'selecting the first div');
	setTimeout(function() {
		equal($children.filter(':nth-child(1)').css('left'), '11px', 'first element has left at 11');
		equal($children.filter(':nth-child(1)').css('top'), '9px', 'first element has top at 9');
		start();
	}, waitTime);
});

asyncTest('sets position of first element centered around (x,y) = (10,8)', function() {
	setTimeout(function() {
		equal($children.filter(':nth-child(2)').css('left'), '9px', 'second element has left at 9');
		equal($children.filter(':nth-child(2)').css('top'), '8px', 'second element has top at 10');
		start();
	}, waitTime);
});

asyncTest('sets position of first element centered around (x,y) = (8,10)', function() {
	setTimeout(function() {
		equal($children.filter(':nth-child(3)').css('left'), '8px', 'third element has left at 8');
		equal($children.filter(':nth-child(3)').css('top'), '9px', 'third element has top at 9');
		start();
	}, waitTime);
});

asyncTest('sets position of first element centered around (x,y) = (10,12)', function() {
	deepEqual($children.filter(':nth-child(4)').get(), $children.last().get(), 'selecting the last div');
	setTimeout(function() {
		equal($children.filter(':nth-child(4)').css('left'), '9px', 'fourth element has left at 9');
		equal($children.filter(':nth-child(4)').css('top'), '8px', 'fourth element has top at 8');
		start();
	}, waitTime);
});