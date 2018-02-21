import { Snake } from './snake';
import * as options from './options';
import * as SquareContent from './square-defines';
import drawBoard from './draw';

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
    this.highScore = localStorage.getItem('highScore');
    this.squaresNeededToWin = 0;
    this.snake = new Snake();
    this.startRow = options.initialY;
    this.startCol = options.initialX;
  }
  newGame() {
    this.board = new Array(options.height);
    for (let row = 0; row < options.height; row++) {
      this.board[row] = new Array(options.width);
      for (let col = 0; col < options.width; col++) {
        // draw walls around the edges
        if (row === 0 || row === options.height - 1 ||
            col === 0 || col === options.width - 1) {
          this.board[row][col] = SquareContent.Wall;
        } else {
          // otherwise it's a free space
          this.board[row][col] = SquareContent.FreeSpace;
          this.squaresNeededToWin++;
        }
      }
    }
    this.board[this.startRow][this.startCol] = SquareContent.Snake;
    this.snake = new Snake();
    this.snake.turnRight();
    this.placeFruit();
    drawBoard();
    this.updateScore();
  }
  lose() {
    console.log('you lost');
    if (this.score > this.highScore) {
      localStorage.setItem('highScore', this.score);
      document.getElementById('highScore').innerHTML = "High Score:&nbsp;" + this.score * 1000;
    }
    this.newGame();
  }
  win() {
    console.log('you won!');
    if (this.score > this.highScore) {
      localStorage.setItem('highScore'. this.score);
      document.getElementById('highScore').innerHTML = "High Score:&nbsp;" + this.score * 1000;
    }
    this.newGame();
  }
  updateScore(number) {
    if (number === 1) {
      this.score += 1;
    } else {
      this.score = 0;
    }
    document.getElementById('score').innerHTML = "Score:&nbsp;" + this.score * 1000;
  }

  placeFruit() {
    while (true) {
      const randomX = Math.floor(Math.random() * options.width);
      const randomY = Math.floor(Math.random() * options.height);
      if (this.board[randomY][randomX] === SquareContent.FreeSpace) {
        // update board
        this.board[randomY][randomX] = SquareContent.Fruit;
        break;
      }
    }
  }
}


