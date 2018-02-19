/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const options = {
  width: 500,
  height: 500,
  initialX: 10,
  initialY: 10,
  squareSize: 10
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = options.width;
canvas.height = options.height;
const drawBoard = () => {
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
};
drawBoard();
window.onkeydown = e => {
  switch (e.key) {
    default:
      break;
    case 'ArrowDown':
      snake.turnDown();
      break;
    case 'ArrowUp':
      snake.turnUp();
      break;
    case 'ArrowLeft':
      snake.turnLeft();
      break;
    case 'ArrowRight':
      snake.turnRight();
      break;
  }
};
const collides = (segments, point) => {
  for (let segment of segments) {
    if (segment[0] === point[0] && segment[1] === point[1]) {
      return true;
    }
  }
  return false;
};

const draw = (square, color) => {
  // TODO shape?

  const [x, y, w, h] = [square[0] * options.squareSize, square[1] * options.squareSize, options.squareSize, options.squareSize].map(Math.round);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const drawFruit = (square, color) => {
  const [x, y, w, h] = [square[0], square[1], options.squareSize, options.squareSize].map(Math.round);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const clear = square => {
  const [x, y, w, h] = [square[0] * options.squareSize, square[1] * options.squareSize, options.squareSize, options.squareSize].map(Math.round);
  ctx.clearRect(x, y, w, h);
};

class Fruit {
  constructor() {
    this.location = [];
    // color = $
  }
  placeFruit() {
    const freeSquares = [];
    console.log(fruit);
    for (let x = 0; x < options.width; x++) {
      for (let y = 0; y < options.height; y++) {
        let square = [x, y];
        if (!collides(snake.segments, square)) {
          freeSquares.push(square);
        }
      }
    }
    if (freeSquares.length === 0) {
      win();
      return;
    }
    this.location = freeSquares[Math.floor(Math.random() * freeSquares.length)];
    console.log(this.location);
    drawFruit(this.location, '#000');
  }
}

class Snake {
  constructor() {
    this.head = [options.initialX, options.initialY];
    [this.dx, this.dy] = [];
    this.segments = [[options.initialX, options.initialY]];
    // TODO mouth open or closed
  }

  turnRight() {
    [this.dx, this.dy] = [1, 0];
  }
  turnUp() {
    [this.dx, this.dy] = [0, -1];
  }
  turnLeft() {
    [this.dx, this.dy] = [-1, 0];
  }
  turnDown() {
    [this.dx, this.dy] = [0, 1];
  }
  lose() {
    console.log('you lost'); // TODO add score and
    alert('lost');
    snake = new Snake();
    [snake.dx, snake.dy] = [0, 1];
  }
  slither() {
    // called on tick, updates snake position
    // move head in direction of latest input
    this.head[0] += this.dx;
    this.head[1] += this.dy;

    this.segments.push([this.head[0], this.head[1]]);

    // if head intersects walls, game over
    if (this.head[0] <= 0 || this.head[0] >= options.width / 10 || this.head[1] <= 0 || this.head[1] >= options.height / 10) {
      this.lose();

      //TBD: snake collisions
      return;
    }
    draw(this.head, '#000');
    //head intersects fruit, increment segments and score
    if (collides(this.head, fruit.location)) {
      console.log('fruit');
      Game.score += 1;
      clear(fruit.location);
      let fruit = new Fruit();
      fruit.placeFruit();

      // if not, clear last segment of snake
    } else {
        let tail = this.segments.shift();

        clear(tail);
      }
  }
}

let snake = new Snake();
let fruit = new Fruit();
fruit.placeFruit();
let start = 0;
function tick() {
  snake.slither();
};

snake.turnRight();
setInterval(tick, 120);
// snake.turnRight();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();
// snake.slither();

/***/ })
/******/ ]);