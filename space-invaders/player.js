let playerCurrentPosition = 262;
let recentlyMoved = false;
let cooldown = false;
let keysPressed = {
  'ArrowLeft': {pressed: false, func: key => handleMovement(key)},
  'ArrowRight': {pressed: false, func: key => handleMovement(key)},
  ' ': {pressed: false, func: key => shoot(key)}
};

function drawPlayer() {
  squares[playerCurrentPosition].classList.add('player');
}

drawPlayer();

function handleMovement(e) {
  if (!recentlyMoved) {
    switch(e) {
      case 'ArrowLeft':
        if (playerCurrentPosition % boardWidth !== 0) {
          playerCurrentPosition--;
        }
        break;
      case 'ArrowRight':
        if (playerCurrentPosition % boardWidth !== boardWidth - 1) {
          playerCurrentPosition++;
        } 
        break;
    }
    squares.forEach(square => square.classList.remove('player'));
    drawPlayer();
    recentlyMoved = true;
    setTimeout(() => recentlyMoved = false, 100);
  }

}

function shoot(e) {
  let bulletId;
  let bulletPosition = playerCurrentPosition - boardWidth;
  function moveBullet() {
    if (squares[bulletPosition].classList.contains('bullet')) {
      squares[bulletPosition].classList.remove('bullet');
      squares[bulletPosition].innerText = '';
      if (bulletPosition > boardWidth) {
        bulletPosition -= boardWidth;
        squares[bulletPosition].classList.add('bullet');
      } else {
        clearInterval(bulletId);
      }
      checkForHit(bulletPosition); 
    }
  }
  switch(e) {
    case ' ':
      if (!cooldown) {
        cooldown = true;
        squares[bulletPosition].classList.add('bullet');
        bulletId = setInterval(moveBullet, 50);
        setTimeout(() => cooldown = false, 800);
      }
  }
}

function checkForHit(bulletPosition) {
  if (squares[bulletPosition].classList.contains('alien')) {
    squares[bulletPosition].classList.remove('alien');
    squares[bulletPosition].classList.remove('bullet');
    squares[bulletPosition].classList.add('explosion');
    setTimeout(() => squares[bulletPosition].classList.remove('explosion'), 40);
    invaders.splice(invaders.indexOf(bulletPosition),1);
    score++;
    scoreDisplay.innerText = score;
    if (invaders.length === 0) {
      clearInterval(gameUpdater);
      clearInterval(gameInterval);
      scoreDisplay.innerText += ' (You Win!)';
    }
  }
}

function handlePlayerKeyDown(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
    keysPressed[e.key].pressed = true;
  }
}

function handlePlayerKeyUp(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
    keysPressed[e.key].pressed = false;
  }
}