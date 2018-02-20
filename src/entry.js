import * as options from './options';
import drawBoard from './draw';
import {Game} from './game';
import * as SquareContent from './square-defines';

let score = 0;

let game = new Game();
game.newGame();


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


function placeFruit() {
  while (true)
  {
    let randomX = Math.floor(Math.random() * options.width);
    let randomY = Math.floor(Math.random() * options.height);
    
    if (game.board[randomY][randomX] == SquareContent.FreeSpace)
    {
      // update board
      game.board[randomY][randomX] = SquareContent.Fruit;
      break;
    }
  }
}


let snake = new Snake();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = options.width * options.squareSize;
canvas.height = options.height * options.squareSize;

export { game };