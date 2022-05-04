const invaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];
let currentDirection = 1;
let counter = 0;
let gameInterval;

(function() {
  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement('div');
    square.classList.add("square");
    if (i >= 285) {
      square.classList.add('endRow');
    }
    gameGrid.appendChild(square);
  }
})();

const squares = Array.from(document.querySelectorAll('.square'));

function drawInvaders() {
  for (let i = 0; i < invaders.length; i++) {
    squares[invaders[i]].classList.add('alien');
  }
}

drawInvaders();

function moveInvaders() {
  counter++;
  if (counter !== 6) {
    for (let i = 0; i < invaders.length; i ++) {
      invaders[i] += currentDirection;
    }
  } else {
    for (let i = 0; i < invaders.length; i ++) {
      invaders[i] += boardWidth;
    }
    currentDirection *= -1;
    counter = 0;
  }
  squares.forEach(square => square.classList.remove('alien'));
  drawInvaders();
}