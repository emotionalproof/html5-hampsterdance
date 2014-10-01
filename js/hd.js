var $rows = $('.row'),
	hampsterCubes = [];

function HampsterCube(element, startIndex){
	this.index = startIndex;
	this.element = element;
	this.element.className = 'cube ' + this.classes[startIndex];
	this.$element = $(element);
	this.boundAdvance = this.advance.bind(this);
	this.$element.on('click', this.boundAdvance);
	this.$element.parent().on('rotate', this.boundAdvance);
}

HampsterCube.prototype.classes = [
	'show-top',
	'show-left',
	'show-front',
	'show-right',
	'show-bottom',
	'show-back'
];

HampsterCube.prototype.advance = function(event){
	event.stopPropagation();
	this.index = (this.index + 1) % this.classes.length;
	this.element.className = "cube " + this.classes[this.index];
}

//set up each row to be a different side of the cube
var startingIndex = 0;
$rows.each(function(){
	$(this).find('.cube').each(function(){
		hampsterCubes.push(new HampsterCube(this, startingIndex));
	});
	startingIndex++;
});

//shift all cubes one after another
var shiftIndex = 0;
var shiftInterval = setInterval(function(){
	hampsterCubes[shiftIndex].$element.trigger('rotate');
	shiftIndex = (shiftIndex + 1) % hampsterCubes.length;
}, 100);