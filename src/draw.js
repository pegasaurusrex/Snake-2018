import options from './options';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = options.width;
canvas.height = options.height;

const drawSquare = (row, col, color) => {
  const [x, y, w, h] = [col * options.squareSize,
                      row * options.squareSize,
                      options.squareSize,
                      options.squareSize,
                    ].map(Math.round);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);  
}

const drawFruit = (row, col) => {
  drawSquare(row, col, '#ff0000')
}

const drawSnake = (row, col) => {
  let color = '#00ff00';
  switch (snake.segments.length % 3)
  {
      case 0: color = '#00ff00'; break;
      case 1: color = '#00ee00'; break;
      case 2: color = '#00cc00'; break;
      //case 3: color = '#00ee00'; break;
      //case 4: color = '#00ff00'; break;
  }
  drawSquare(row, col, color)
}

const drawWall = (row, col) => {
  drawSquare(row, col, '#303030')
}

const clearSquare = (row, col) => {
  drawSquare(row, col, '#ffffff')
}

function drawBoard()
{
  updateScore();

  for (let row = 0; row < options.width; row++) {
    for (let col = 0; col < options.height; col++) {
      square = board[row][col];  
      switch (square)
      {
        case SquareContent.Fruit:
          drawFruit(row, col);
          break;

          case SquareContent.Snake:
          drawSnake(row, col);
          break;
          
          case SquareContent.Wall:
          drawWall(row, col);
          break;

          case SquareContent.FreeSpace:
          clearSquare(row, col);
          break;

          default:
          console.log("Unknown square type");
          break;
      }
    }
  }
}


export default drawBoard;
