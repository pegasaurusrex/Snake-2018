import * as options from './options';
import drawBoard from './draw';
import { game } from './entry';
import * as SquareContent from './square-defines';

export class Snake {
  constructor() {
    this.startRow = options.initialY;
    this.startCol = options.initialX;
    this.segments = [[this.startRow, this.startCol]];
    this.desiredlength = 1;
    [this.dx, this.dy] = [];
  }
  // TODO BUG: after consuming a segment, pressing reverse direction
  // direction of snake causes
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
  slither() {
    // called on tick, updates snake position
    // move head in direction of latest input
    let nextHeadPosition = [
      this.segments[this.segments.length - 1][0] + this.dx,
      this.segments[this.segments.length - 1][1] + this.dy];
    this.segments.push(nextHeadPosition);
    if (this.segments.length > this.desiredlength) {
      let tail = this.segments.shift();
      game.board[tail[1]][tail[0]] = SquareContent.FreeSpace;
    }

    let row = this.segments[this.segments.length - 1][1];
    let col = this.segments[this.segments.length - 1][0];

    // resolve collision conditions (or not)
    let nextSquare = game.board[row][col];
    // if collision with snake or wall, lose
    switch (nextSquare) {
      case SquareContent.Wall:
        game.lose();
        return;

      case SquareContent.Snake:
        game.lose();
        return;
      // if collision with fruit, increment score, snake length
      case SquareContent.Fruit:
        game.board[row][col] = SquareContent.Snake;
        this.desiredlength += 3;
        game.placeFruit();
        game.updateScore(1);
        break;
      // if not, do nothing
      case SquareContent.FreeSpace:
        game.board[row][col] = SquareContent.Snake;
        break;
      default:
        console.log('unknown square type collision');
        break;
    }
    // if there aren't any more free squares, win
    if (this.desiredlength >= game.squaresNeededToWin) {
      game.win();
      return;
    }
    // redraw board based on the model
    drawBoard();
  }
}
