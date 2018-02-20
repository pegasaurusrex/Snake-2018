const height = 5;
const width = 5;

let boardSetup = (height, width) => [[...Array(height).keys()], [...Array(width).keys()]];
let board = boardSetup(height, width);
for (square of board) {
    console.log(square);
}
console.log(board);