const hampsterCubes = [];
const rotateEvent = new CustomEvent('rotate', {bubbles: true});
const CUBE_SIZE = 100;
const rowWidth = Math.floor(window.innerWidth / CUBE_SIZE);
const columnHeight = Math.floor(window.innerHeight/ CUBE_SIZE);
const NUM_CUBES = rowWidth * columnHeight;
const template = document.querySelector('template').innerHTML;
let columnIndex = 0;
let startingIndex = 0;

class HampsterCube {
  constructor (element, startIndex){
    this.index = startIndex;
    this.element = element;
    this.element.className = 'cube ' + this.classes[startIndex];
    this.element.addEventListener('click', this.advance);
    this.element.offsetParent.addEventListener('rotate', this.advance);
  }

  advance = () => {
    this.index = (this.index + 1) % this.classes.length;
    this.element.className = `cube ${this.classes[this.index]}`;
  }
}

// per MDN: Static class-side properties and prototype data properties must be defined outside of the ClassBody declaration:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
HampsterCube.prototype.classes = [
	'show-top',
	'show-left',
	'show-front',
	'show-right',
	'show-bottom',
	'show-back'
];

function setupHampsterDance(){
  const container = document.querySelector('#container');
  let shiftIndex = 0;

  container.style.width = rowWidth * CUBE_SIZE;
  container.innerHTML = new Array(NUM_CUBES).fill(template).join('\n');

  const cubes = document.querySelectorAll('.cube');
  cubes.forEach(cube => {
    hampsterCubes.push(new HampsterCube(cube, startingIndex));
    ++columnIndex;
    if (columnIndex === rowWidth){
			columnIndex = 0;
			++startingIndex;
		}
  });

	const shiftInterval = setInterval(function(){
		hampsterCubes[shiftIndex].element.dispatchEvent(rotateEvent);
		shiftIndex = (shiftIndex + 1) % hampsterCubes.length;
	}, 100);

  document.querySelector('audio').addEventListener('canplay', e => {
    e.target.play();
  });
}

setupHampsterDance();