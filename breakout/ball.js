const ballStartingPos = [320, 30];
let ballCurrentPos = [...ballStartingPos];
const ballDiameter = 20;
let ballDirection = [2, 2];
let allBlocks = Array.from(document.querySelectorAll('.block'));
const scoreDisplay = document.getElementById('score');
let score = 0;

function updateBallPos() {
  ball.style.left = ballCurrentPos[0] + 'px';
  ball.style.bottom = ballCurrentPos[1] + 'px';
}

const ball = document.createElement('div');
ball.classList.add('ball');
updateBallPos();
board.appendChild(ball);

function moveBall() {
  ballCurrentPos[0] += ballDirection[0];
  ballCurrentPos[1] += ballDirection[1];
  updateBallPos();
  checkForCollisions();
}

function checkForCollisions() {
  // check for collision with blocks
  for (let i = 0; i < originalBlocks.length; i++) {
    if (isPresent[i]) {
      if (ballCurrentPos[1] + ballDiameter === originalBlocks[i].bottomLeft[1]
      && ballCurrentPos[0] > originalBlocks[i].bottomLeft[0] - ballDiameter
      && ballCurrentPos[0] < originalBlocks[i].bottomRight[0]) { // hit from bottom
        ballDirection[1] = -2;
        isPresent[i] = false;
        allBlocks[i].classList.remove('block');
        score++;
        scoreDisplay.innerText = score;
      } else if (ballCurrentPos[0] + ballDiameter === originalBlocks[i].bottomLeft[0]
      && ballCurrentPos[1] > originalBlocks[i].bottomLeft[1] - ballDiameter
      && ballCurrentPos[1] < originalBlocks[i].topLeft[1]) { // hit from left
        ballDirection[0] = -2;
        isPresent[i] = false;
        allBlocks[i].classList.remove('block');
        score++;
        scoreDisplay.innerText = score;
      } else if (ballCurrentPos[1] === originalBlocks[i].topLeft[1]
      && ballCurrentPos[0] > originalBlocks[i].topLeft[0] - ballDiameter
      && ballCurrentPos[0] < originalBlocks[i].topRight[0]) { // hit from top
        ballDirection[1] = 2;
        isPresent[i] = false;
        allBlocks[i].classList.remove('block');
        score++;
        scoreDisplay.innerText = score;
      } else if (ballCurrentPos[0] === originalBlocks[i].bottomRight[0]
      && ballCurrentPos[1] > originalBlocks[i].bottomRight[1] - ballDiameter
      && ballCurrentPos[1] < originalBlocks[i].topRight[1]) { // hit from right
        ballDirection[0] = 2;
        isPresent[i] = false;
        allBlocks[i].classList.remove('block');
        score++;
        scoreDisplay.innerText = score;
      }
    } 
  }
  
  // check for win
  if (score === originalBlocks.length) {
    clearInterval(gameInterval);
    score += ' (You win!)'
    scoreDisplay.innerText = score;
  }

  // check for collision with user
  let userMidPoint = userCurrentPos[0] + userWidth/2;
  let ballMidPoint = ballCurrentPos[0] + ballDiameter/2;
  if (ballCurrentPos[0] >= userCurrentPos[0] - ballDiameter
  && ballMidPoint <= userMidPoint 
  && ballCurrentPos[1] === userCurrentPos[1] + userHeight) {
    ballDirection[0] = -2;
    ballDirection[1] = 2;
  } else if (ballMidPoint > userMidPoint
  && ballCurrentPos[0] <= userCurrentPos[0] + userWidth
  && ballCurrentPos[1] === userCurrentPos[1] + userHeight) {
    ballDirection[0] = 2;
    ballDirection[1] = 2;
  }
  
  // check for collision with game borders
  if (ballCurrentPos[0] >= (boardWidth - ballDiameter)) { // hit right wall
    ballDirection[0] = -2;
  }
  if (ballCurrentPos[0] <= 0) { // hit left wall
    ballDirection[0] = 2;
  }
  if (ballCurrentPos[1] >= (boardHeight - ballDiameter)) { // hit top wall
    ballDirection[1] = -2;
  }
  if (ballCurrentPos[1] < 0) { // hit bottom wall
    clearInterval(gameInterval);
    isPlaying = false;
    isGameOver = true;
    score = 'Game Over!';
    scoreDisplay.innerText = score;
  }
}