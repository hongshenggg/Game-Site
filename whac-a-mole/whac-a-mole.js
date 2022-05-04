const gameGrid = document.getElementById('gameGrid');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('timeLeft');
const button = document.getElementById('starter');

let currentMole;
const INITIAL_SCORE = 0;
const INITIAL_TIME_LEFT = 30;
let score = INITIAL_SCORE;
let timeLeft = INITIAL_TIME_LEFT;
let isHit = false;
let isPaused = true;
const GAME_SPEED = 500;
const MS_PER_SEC = 1000;
let intervalId;
let countDownId;
const squares = Array(9);

(function () {
  for (let i = 0; i < squares.length; i++) {
    const square = document.createElement('div');
    square.setAttribute('class', 'square');
    square.setAttribute('id', i);
    square.addEventListener('mousedown', handleMouseDown);
    square.addEventListener('mouseup', handleMouseUp);
    gameGrid.appendChild(square);
  }
})();

function handleMouseDown() {
  if (this === currentMole && !isHit && !isPaused) {
    isHit = true;
    score++;
    scoreDisplay.innerText = score;
  }
}

function handleMouseUp() {
  if (this === currentMole) {
    this.classList.remove('mole');
  }
}
function spawnMole() {
  let randomNumber = Math.floor(Math.random() * squares.length);
  let probability = 0.6 - Math.random();
  if (probability > 0) {
    if (currentMole) {
      while(randomNumber == currentMole.getAttribute('id')) {
        randomNumber = Math.floor(Math.random() * squares.length);
      }
      currentMole.classList.remove('mole');
    }
    const randomSquare = document.getElementById(randomNumber.toString());
    randomSquare.classList.add('mole');
    currentMole = randomSquare;
    isHit = false;
  }
}

function countDown() {
  timeLeft--;
  timeLeftDisplay.innerText = timeLeft;
  if (timeLeft < 0) {
    button.innerText = 'Try Again';
    clearInterval(intervalId);
    clearInterval(countDownId);
    alert('Game Over. Final score: ' + score);
  }
}

function handleButtonClick() {
  if (button.innerText === 'Start' || button.innerText === 'Try Again') {
    button.innerText = 'Pause';
    isPaused = false;
    if (timeLeft <= 0) {
      score = INITIAL_SCORE;
      scoreDisplay.innerText = score;
      timeLeft = INITIAL_TIME_LEFT;
    }
    intervalId = setInterval(spawnMole, GAME_SPEED);
    countDownId = setInterval(countDown, MS_PER_SEC);
  } else if (button.innerText === 'Pause') {
    button.innerText = 'Start';
    isPaused = true;
    clearInterval(intervalId);
    clearInterval(countDownId);
  }
}