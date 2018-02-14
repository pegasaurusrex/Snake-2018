import options from './options';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = options.width;
canvas.height = options.height;


const draw = (square, color) => { // TODO shape?
  ctx.rect(0, 0, canvas.width, canvas.height);
  let [x, y, w, h] = [square[0] * options.squareSize,
                      square[1] * options.squareSize,
                      options.squareSize,
                      options.squareSize,
                    ];
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const clear = (square) => {
  ctx.clearRect(square[0], square[1], options.squareSize, options.squareSize);
};

const redraw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export default { draw, clear, redraw };
