import { Snake } from './snake';
import * as options from './options';
import * as SquareContent from './square-defines';


// const SquareContent = {
//   FreeSpace: 0,
//   Snake: 1,
//   Fruit: 2,
//   Wall: 3,
// };


export class Game {
  constructor() {
    this.board = null;
    this.score = 0;
    this.squaresNeededToWin = 0;
  }
  newGame() {
    this.board = new Array(options.height);
    for (let row = 0; row < options.width; row++) {
      this.board[row] = new Array(options.width);
      for (let col = 0; col < options.height; col++) {

        // draw walls around the edges
        if (row == 0 || row == options.height-1 ||
            col == 0 || col == options.width-1)
        {
          this.board[row][col] = SquareContent.Wall;
        }
        else  // otherwise it's a free space
        {
          this.board[row][col] = SquareContent.FreeSpace;
          this.squaresNeededToWin++;
        }
      }
    }

    let snake = new Snake();
    snake.init();
    placeFruit();
    drawBoard();
    updateScore();
  }
}

function updateScore()
{
  document.getElementById("score").innerHTML = score * 1000;
}

setInterval(tick, 100);


function tick() {
  snake.slither();
  updateScore();
};
