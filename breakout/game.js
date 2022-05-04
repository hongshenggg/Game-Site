const board = document.querySelector('.gameBoard');
const overlay = document.querySelector('.overlay');
let isPlaying = false;
let isGameOver = false;
let gameInterval;

const boardWidth = 660;
const boardHeight = 410;

window.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
  if (e.key === ' ' && !isPlaying && !isGameOver) {
    gameInterval = setInterval(moveBall, 20);
    isPlaying = true;
    overlay.style.visibility = "hidden";
  } else if (e.key ===' ' && isPlaying) {
    clearInterval(gameInterval);
    isPlaying = false;
    overlay.style.visibility = "visible";
  } else if (e.key === ' ' && isGameOver) {
    resetGame();
    isGameOver = false;
  }
}

function resetGame() {
  allBlocks.forEach(block => block.remove());
  drawBlocks();
  ballCurrentPos = [...ballStartingPos];
  userCurrentPos = [...userStartingPos];
  isPresent = [...originalBlocks];
  allBlocks = Array.from(document.querySelectorAll('.block'));
  ballDirection = [2,2];
  score = 0;
  scoreDisplay.innerText = score;
  updateBallPos();
  updateUserPos();
}