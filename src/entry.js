import * as options from './options';
import { Game } from './game';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = options.width * options.squareSize;
canvas.height = options.height * options.squareSize;

localStorage.setItem('highScore', 0);
export let game = new Game();
game.newGame();

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
function tick() {
  game.snake.slither();
}
setInterval(tick, 100);
