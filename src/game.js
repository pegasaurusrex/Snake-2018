import Snake from './snake';
import Fruit from './fruit';
import { draw, redraw } from './draw';

let score = 0;
let highScore = 0;

function gameStart() {
  let snake = new Snake();
  // let fruit = new Fruit();
  // Fruit.placeFruit();

  // game loop
  const tick = (timestamp) => {
    snake.slither();
    window.requestAnimationFrame(nextTimestamp => tick(nextTimestamp));
  };
  // initialize input event listeners
  window.onkeydown = (e) => {
    switch (e.key) {
      default:
        break;
      case 'ArrowDown':
        snake.turnRight();
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
}
const reset = () => {
  if (score > highScore) {
    highScore = score;
  }
  score = 0;
  redraw();
  gameStart();
};

const win = () => {
  alert('you cheated');
  reset();
};

const lose = () => {
  console.log('you lost'); // TODO add score and
  reset();
};

export { gameStart, win, lose, score, reset };
