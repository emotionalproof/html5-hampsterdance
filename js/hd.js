var cubeElements = document.querySelectorAll('.cube'),
	rows = document.querySelectorAll('.row'),
	cubes = [];

function HampsterCube(element, startIndex){
	this.index = startIndex;
	this.element = element;
	this.$element = $(element);
	this.boundAdvance = this.advance.bind(this);
	this.$element.on('click', this.boundAdvance);
	this.$element.on('rotate', this.boundAdvance);
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

// var spinInterval = setInterval(function(){
// 	cubes.forEach(function(hampsterCube){
// 		hampsterCube.advance();
// 	});
// }, 2000);

Array.prototype.forEach.call(cubeElements, function(cubeElement){
	cubes.push(new HampsterCube(cubeElement, 0));
});

Array.prototype.forEach.call(rows, function(row){
		// var spinner = setInterval(function(){
		// 	var 
		// }, 10000);
})