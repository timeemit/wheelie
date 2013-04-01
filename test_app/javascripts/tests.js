test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

module('wheelie', {
	setup: function() {
		$( "#qunit-fixture" ).append('<div>A</div><div>B</div><div>C</div><div>D</div>');
		$('#qunit-fixture div').css('height', '2px');
		$('#qunit-fixture div').css('width', '2px');
	}
});

test('has four div elements', function() {
	var $fixture = $( "#qunit-fixture" );
	equal($fixture.children('div').size(), 4, 'four div elemements are in the fixture');
})

test('sets css position to be absolute', function() {
	$children = $( "#qunit-fixture" ).children('div')
	$children.wheelie(10,10,2);
	$children.each(function(){
		equal($(this).css('position'), 'absolute');
	});
})

test('sets css width to be specific', function() {
	$children = $( "#qunit-fixture" ).children('div')
	$children.wheelie(10,10,2);
	$children.each(function(){
		equal($(this).css('width'), '2px');
	});
	$children.each(function(){
		equal($(this).css('height'), '2px');
	});
})


test('sets position of each element correctly', function() {
	$children = $( "#qunit-fixture" ).children('div');
	$children.wheelie(10,10,2);
	strictEqual($children.filter(':nth-child(1)').get(), $children[0], 'selecting the first div');
	equal($children.filter(':nth-child(1)').css('left'), '9px', 'first element is centered around (x,y) = (10,9) with left at 9');
	equal($children.filter(':nth-child(1)').css('top'), '8px', 'first element is centered around (x,y) = (10,9) with top at 8');
	equal($children.filter(':nth-child(2)').css('left'), '10px', 'second element is centered around (x,y) = (11,10) with left at 10');
	equal($children.filter(':nth-child(2)').css('top'), '9px', 'second element is centered around (x,y) = (11,10) with top at 9');
	equal($children.filter(':nth-child(3)').css('left'), '9px', 'third element is centered around (x,y) = (10,11) with left at 9');
	equal($children.filter(':nth-child(3)').css('top'), '10px', 'third element is centered around (x,y) = (10, 11) with top at 10');
	equal($children.filter(':nth-child(4)').css('left'), '8px', 'fourth element is centered around (x,y) = (9,10) with left at 8');
	equal($children.filter(':nth-child(4)').css('top'), '9px', 'fourth element is centered around (x,y) = (9,10) with top at 9');
})