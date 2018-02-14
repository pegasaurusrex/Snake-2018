import { collides, segments } from './snake';
import win from './game';
import options from './options';
import draw from './draw';

class Fruit {
  constructor() {
    this.location = [];
    // color = $
  }
  placeFruit() {
    const freeSquares = [];
    for (let x = 0; x < options.width; x++) {
      for (let y = 0; y < options.height; y++) {
        let square = [x, y];
        if (!collides(segments, square)) {
          freeSquares.push(square);
        }
      }
    }
    if (freeSquares.length === 0) {
      win();
      return;
    }
    this.location = freeSquares[Math.floor(Math.random() * freeSquares.length)];
    draw(this.location, '#000');
  }
}

export default Fruit;
