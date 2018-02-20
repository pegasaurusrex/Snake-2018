import * as options from './options';
import drawBoard from './draw';
import {game} from './entry';
import * as SquareContent from './square-defines';

export class Snake {
  constructor() {
    this.startRow = options.initialY;
    this.startCol = options.initialX;

    this.segments = [[this.startRow, this.startCol]];
    this.desiredlength = 1;
    
    [this.dx, this.dy] = [];
  }

  init() {
    // let startRow = this.startRow;
    // let startCol = this.startCol;

    game.board[this.startRow][this.startCol] = SquareContent.Snake;
    snake.turnRight();
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
    console.log('you lost'); 
    game.newGame();
  }

  win() {
    console.log('you won!'); 
    game.newGame();
  }

  slither() {
    // called on tick, updates snake position
    // move head in direction of latest input
    let nextHeadPosition = [
      this.segments[this.segments.length - 1][0] + this.dx,
      this.segments[this.segments.length - 1][1] + this.dy];
      
    this.segments.push(nextHeadPosition);

    if (this.segments.length > this.desiredlength)
    {
      let tail = this.segments.shift();
      game.board[tail[1]][tail[0]] = SquareContent.FreeSpace;
      //this.segments.length -= 1;

    }

    let row = this.segments[this.segments.length - 1][1];
    let col = this.segments[this.segments.length - 1][0];


    // if there's a collision, game over
    let nextSquare = game.board[row][col];
    switch(nextSquare)
    {
      case SquareContent.Wall:
        this.lose();
        return;

      case SquareContent.Snake:
        this.lose();
        return;

      case SquareContent.Fruit:
        game.board[row][col] = SquareContent.Snake;
        this.desiredlength += 3;
        placeFruit();
        score += 1;
        break;

      case SquareContent.FreeSpace:
        game.board[row][col] = SquareContent.Snake;
        break;
    }

    if (this.desiredlength >= game.squaresNeededToWin)
    {
      this.win();
      return;
    }
    
    // redraw board based on the model
    drawBoard();

  }
}
