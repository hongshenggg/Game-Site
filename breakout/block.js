const blockWidth = 60;
const blockHeight = 20;
const originalBlocks = [];

class Block {
  constructor(x, y) {
    this.bottomLeft = [x,y];
    this.bottomRight = [x + blockWidth, y];
    this.topLeft = [x, y + blockHeight];
    this.topRight = [x + blockWidth, y + blockHeight];
  }
}

for (let i = 10; i < 600; i += blockWidth + 4) {
  for (let j = 260; j < 400; j += blockHeight + 4) {
    originalBlocks.push(new Block(i, j));
  }
}

let isPresent = [...originalBlocks];

function drawBlocks() {
  for (let i = 0; i < originalBlocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = originalBlocks[i].bottomLeft[0] + 'px';
    block.style.bottom = originalBlocks[i].bottomLeft[1] + 'px';
    board.appendChild(block);
  }
}

drawBlocks();