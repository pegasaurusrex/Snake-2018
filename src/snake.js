import Game from './game';
import options from './options';
import Fruit from './fruit';
import { draw, clear } from './draw';

const collides = (segments, point) => {
  for (let segment of segments) {
    if (segment[0] === point[0] && segment[1] === point[1]) {
      return true;
    }
  }
  return false;
};

class Snake {
  constructor() {
    this.head = [options.initialX, options.initialY];
    [this.dx, this.dy] = [0, 0];
    this.segments = [[this.head]];
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
  slither() {
    // called on tick, updates snake position
    // move head in direction of latest input
    this.head[0] += this.dx;
    this.head[1] += this.dy;
    this.segments.push(this.head);
    // if head intersects walls, game over
    if (this.head[0] < 0 || this.head[0] >= options.width
        || this.head[1] < 0 || this.head[1] >= options.height) {
      Game.lose();
      return;
    }

    // if head intersects segments, game over
    if (collides(this.segments, this.head)) {
      Game.lose();
      return;
    }
    draw(this.head, '#000');
    // head intersects fruit, increment segments and score
    if (this.collides(this.head, Game.fruit.location)) {
      Game.score += 1;
      clear(Game.fruit.location);
      let fruit = new Fruit();
      fruit.placeFruit();
    // if not, clear last segment of snake
    } else {
      clear(this.segments.shift());
    }
  }
}

export default Snake;
