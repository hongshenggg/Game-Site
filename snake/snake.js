const DEFAULT_SPEED = 5;
let snakeSpeed = DEFAULT_SPEED;
let snakeBody = [
    {x:11, y:11},
    {x:11, y:10},
    {x:11, y:9}
];
let recentlyAccelerated = false;
const score = document.getElementById("score");

const updateSnake = () => {
    const newHead = {...snakeBody[0]};
    const newDirection = getInputDirection();
    newHead.x += newDirection.x;
    newHead.y += newDirection.y;
    snakeBody.unshift(newHead);
    snakeBody.pop();
}

const onSnake = (pos) => {
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i].x === pos.x && snakeBody[i].y === pos.y) {
            return true;
        }
    }
    return false;
}

const growSnake = () => {
    snakeBody.push({...snakeBody[snakeBody.length - 1]});
    score.innerHTML = "Current Length: " + snakeBody.length;
}

const shrinkSnake = () => {
    snakeBody.pop();
    score.innerHTML = "Current Length: " + snakeBody.length;
}

const isEatenBySnake = (grid) => {
    return snakeBody[0].x === grid.x && snakeBody[0].y === grid.y;
}

const snakeOutOfBounds = () => {
    var snakeHead = snakeBody[0];
    return snakeHead.x < 1 || snakeHead.x > GRID_SIZE || snakeHead.y < 1 || snakeHead.y > GRID_SIZE;
}

const snakeOnSelf = () => {
    for (let i = 1; i < snakeBody.length; i++) {
        if (isEatenBySnake(snakeBody[i])) {
            return true;
        }
    }
    return false;
}

function drawSnake(gameBoard) {
    for (let i = 0; i < snakeBody.length; i++) {
        const segment = snakeBody[i];
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    }
}