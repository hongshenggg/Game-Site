const GRID_SIZE = 21;

const getNewFoodPosition = () => {
    const xPos = getRandomInt();
    const yPos = getRandomInt();
    newPos = {x: xPos, y: yPos};
    while (onSnake(newPos)) {
        const xPos = getRandomInt();
        const yPos = getRandomInt();
        newPos = {x: xPos, y: yPos}
    }
    return newPos;
}

const getRandomInt = () => {
    return Math.floor(Math.random() * GRID_SIZE) + 1;
}

let food = getNewFoodPosition();

const updateFood = () => {
    if(isEatenBySnake(food)) {
        growSnake();
        food = getNewFoodPosition();
    }
}

const drawFood = (gameBoard) => {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}