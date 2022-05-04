const gameBoard = document.getElementById("gameBoard");
const currentSpeed = document.getElementById("speed");
const gameOverScreen = document.querySelector(".gameOverScreen");
const pauseScreen = document.querySelector(".pauseOverlay");

let isPaused = true;
let gameOver = false;
let gameLoop;

const main = () => {
    if (gameOver) {
        gameOverScreen.style.visibility = "visible";
        document.addEventListener("keydown", resetGame);
        clearInterval(gameLoop);
    }
    if (snakeBody.length % 5 === 0 && !recentlyAccelerated) {
        clearInterval(gameLoop);
        snakeSpeed += 1;
        gameLoop = setInterval(main, 1000/snakeSpeed);
        recentlyAccelerated = true;
        currentSpeed.innerHTML = "Current Speed: " + snakeSpeed;
    }
    if (snakeBody.length % 5 === 1) {
        recentlyAccelerated = false;
    }
    update();
    draw();
}

const pauseOrPlay = (e) => {
    if (e.key === "p") {
        if (isPaused) {
            gameLoop = setInterval(main, 1000/snakeSpeed);
            isPaused = false;
            pauseScreen.style.visibility = "hidden"
        } else {
            clearInterval(gameLoop);
            isPaused = true;
            pauseScreen.style.visibility = "visible"
        }
    }
}

document.addEventListener("keydown", pauseOrPlay);



const update = () => {
    updateSnake();
    updateFood();
    updateBadFood();
    gameOver = isGameOver();
}

const draw = () => {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
    drawBadFood(gameBoard);
}

const isGameOver = () => {
    return snakeOutOfBounds() || snakeOnSelf() || snakeBody.length <= 1;
}

const resetGame = (e) => {
    if (e.key === " ") {
        gameOverScreen.style.visibility = "hidden";
        snakeBody = [
            {x:11, y:11},
            {x:11, y:10},
            {x:11, y:9}
        ];
        snakeSpeed = DEFAULT_SPEED;
        food = getNewFoodPosition();
        badFood = getNewFoodPosition();
        score.innerHTML = "Current Score: 3";
        currentSpeed.innerHTML = "Current Speed: 5";
        inputDirection = {x:0, y:1};
        prevInputDirection = moveDown;
        gameOver = false;
        clearInterval(gameLoop);
        gameLoop = setInterval(main, 1000/snakeSpeed);
        document.removeEventListener("keydown", resetGame);
    }
}