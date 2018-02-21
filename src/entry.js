import * as options from './options';
import { Game } from './game';

// initialize canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = options.width * options.squareSize;
canvas.height = options.height * options.squareSize;

localStorage.setItem('highScore', 0);
export let game = new Game();
game.newGame();

// Keyboard input events
window.onkeydown = (e) => {
  switch (e.key) {
    default:
      break;
    case 'ArrowDown':
      game.snake.turnDown();
      break;
    case 'ArrowUp':
      game.snake.turnUp();
      break;
    case 'ArrowLeft':
      game.snake.turnLeft();
      break;
    case 'ArrowRight':
      game.snake.turnRight();
      break;
  }
};

// game loop
// TODO refactor to use requestAnimationFrame
function tick() {
  game.snake.slither();
}
let interval;
function startInterval() {
  interval = setInterval(tick, 100);
}
startInterval();
const stopInterval = () => clearInterval(interval);

export { startInterval, stopInterval };
