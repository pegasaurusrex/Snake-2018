import options from './options';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = options.width;
canvas.height = options.height;
const drawBoard = () => {
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
};
drawBoard();
window.onkeydown = (e) => {
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

const draw = (square, color) => { // TODO shape?

  const [x, y, w, h] = [square[0],
                      square[1],
                      options.squareSize,
                      options.squareSize,
                    ].map(Math.round);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};


const clear = (square) => {
  const [x, y, w, h] = [square[0],
                      square[1],
                      options.squareSize,
                      options.squareSize,
                    ].map(Math.round);
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
    draw(this.location, '#000');
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
    if (this.head[0] < 0 || this.head[0] >= options.width
        || this.head[1] < 0 || this.head[1] >= options.height) {
      this.lose();
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
const tick = (timestamp) => {
  snake.slither();
    window.requestAnimationFrame(nextTimestamp => tick(nextTimestamp));

};
snake.turnRight();
tick(start);
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