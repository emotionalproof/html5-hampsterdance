var	hampsterCubes = [],
	CUBE_SIZE = 100,
	rawTemplate = $('#template').html(),
	compiledTemplate = 	Handlebars.compile(rawTemplate),
	rowWidth = Math.floor(window.innerWidth / CUBE_SIZE),
	columnHeight = Math.floor(window.innerHeight/ CUBE_SIZE),
	NUM_CUBES = rowWidth * columnHeight,
	columnIndex = 0,
	startingIndex = 0;

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

function setupHampsterDance(){	
	var $container = $('#container');
	$container.css({'width': rowWidth * 100});

	$container.html(compiledTemplate({'cubes': new Array(NUM_CUBES)}));

	$cubes = $('.cube')
	$cubes.each(function(){
		hampsterCubes.push(new HampsterCube(this, startingIndex));
		columnIndex++;
		if (columnIndex === rowWidth){
			startingIndex++;
			columnIndex = 0;
		}
	});

	var shiftIndex = 0;
	var shiftInterval = setInterval(function(){
		hampsterCubes[shiftIndex].$element.trigger('rotate');
		shiftIndex = (shiftIndex + 1) % hampsterCubes.length;
	}, 100);

	$('audio')[0].play();
}

setupHampsterDance();