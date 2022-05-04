const userWidth = 100;
const userHeight = 10;
const userStartingPos = [280, 20];
let userCurrentPos = [...userStartingPos];

const user = document.createElement('div');
user.classList.add('user');
updateUserPos();
board.appendChild(user);

function updateUserPos() {
  user.style.left = userCurrentPos[0] + 'px';
  user.style.bottom = userCurrentPos[1] + 'px';
}

function moveUser(e) {
  if (isPlaying) {
    switch(e.key) {
      case 'ArrowLeft':
        if (userCurrentPos[0] > 0) {
          userCurrentPos[0] -= 10;
        }
        break;
      case 'ArrowRight':
        if (userCurrentPos[0] < boardWidth - userWidth) {
          userCurrentPos[0] += 10;
        }
        break;
    }
    updateUserPos();
  }
}

window.addEventListener('keydown', moveUser);