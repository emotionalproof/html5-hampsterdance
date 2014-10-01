var cube = document.querySelector('#cube'),
	classes = [
		'show-top',
		'show-left',
		'show-front',
		'show-right',
		'show-bottom',
		'show-back'
	],
	index = 0;

function setClass(className){
	cube.className = className;
}

var spinInterval = setInterval(function(){
	setClass(classes[index]);
	index = (index + 1) % classes.length;
}, 2000);

/* hampsterCube object
	
	currentIndex;

*/