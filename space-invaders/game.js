const gameGrid = document.getElementById('grid');
const pauseOverlay = document.querySelector('.overlay');
const boardWidth = 15;
const boardHeight = 20;
const totalSquares = boardWidth * boardHeight;
const scoreDisplay = document.getElementById('score');
let score = 0;
let gameUpdater;
let isPaused = true;

function updateGame() {
  for (let i = invaders.length - 1; i >= 0; i--) {
    if (squares[invaders[i]].classList.contains('player') ||
    squares[invaders[i]].classList.contains('endRow')) {
      clearInterval(gameUpdater);
      clearInterval(gameInterval);
      document.removeEventListener('keydown', handlePlayerKeyDown);
      document.removeEventListener('keydown', handlePlayerKeyUp);
      scoreDisplay.innerText += ' (Game Over!)';
    }
  }
  Object.keys(keysPressed).forEach(key => {
    if (keysPressed[key].pressed) {
      keysPressed[key].func(key);
    }
  })
}

function pauseOrPlay(e) {
  switch(e.key) {
    case 'p':
      if (isPaused) {
        isPaused = false;
        pauseOverlay.style.opacity = 0;
        gameInterval = setInterval(moveInvaders, 650);
        gameUpdater = setInterval(updateGame, 50);
        document.addEventListener('keydown', handlePlayerKeyDown);
        document.addEventListener('keyup', handlePlayerKeyUp);
      } else {
        isPaused = true;
        pauseOverlay.style.opacity = 1;
        clearInterval(gameInterval);
        clearInterval(gameUpdater);
        document.removeEventListener('keydown', handlePlayerKeyDown);
        document.removeEventListener('keydown', handlePlayerKeyUp);
      }
  }
}

document.addEventListener('keydown', pauseOrPlay);