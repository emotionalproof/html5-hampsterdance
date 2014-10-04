var $rows = $('.row'),
	$cubes = $('.cube'),
	hampsterCubes = [],
	CUBE_SIZE = 100;

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
// var startingIndex = 0;
// $rows.each(function(){
// 	$(this).find('.cube').each(function(){
// 		hampsterCubes.push(new HampsterCube(this, startingIndex));
// 	});
// 	startingIndex++;
// });

//set up each row depending on device width
//TODO: set container dimensions based on device width
var rowWidth = Math.floor(window.innerWidth / CUBE_SIZE),
	columnIndex = 0,
	startingIndex = 0;

$('.container').css({'width': rowWidth * 100});
$cubes.each(function(){
	hampsterCubes.push(new HampsterCube(this, startingIndex));
	columnIndex++;
	if (columnIndex === rowWidth){
		startingIndex++;
		columnIndex = 0;
	}
});


//shift all cubes one after another
var shiftIndex = 0;
var shiftInterval = setInterval(function(){
	hampsterCubes[shiftIndex].$element.trigger('rotate');
	shiftIndex = (shiftIndex + 1) % hampsterCubes.length;
}, 100);