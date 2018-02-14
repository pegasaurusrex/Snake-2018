import Snake from './snake';
import Fruit from './fruit';
import { draw, reset } from './draw';

let highScore = 0;
let snake = new Snake();
let fruit = new Fruit();

// Where the game engine runs, time ticks, state updated, win\lose conditions
class Game {
  constructor() {
    this.score = 0;
  }

  gameStart() {

    fruit.placeFruit();
    // initialize input event listeners
    window.onkeydown = (e) => {
      switch (e.key) {
        default:
          break;
        case 'ArrowDown':
          this.snake.turnRight();
          break;
        case 'ArrowUp':
          this.snake.turnUp();
          break;
        case 'ArrowLeft':
          this.snake.turnLeft();
          break;
        case 'ArrowRight':
          this.snake.turnRight();
          break;
      }
    };
    this.tick(timestamp);
  }
  // game loop
  tick(timestamp) {
    this.snake.move();
    window.requestAnimationFrame(nextTimestamp => this.tick(nextTimestamp));
  }
  reset() {
    if (this.score > highScore) {
      highScore = this.score;
    }
    this.score = 0;
    draw.reset();
    game = new Game();
    game.gameStart();
  }

  win() {
    alert('you cheated');
    this.reset();
  }

  lose() {
    console.log('you lost'); // TODO add score and
    this.reset();
  }
}

export default Game;
