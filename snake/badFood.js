let badFood = getNewFoodPosition();

const updateBadFood = () => {
    if(isEatenBySnake(badFood)) {
        shrinkSnake();
        badFood = getNewFoodPosition();
    }
}

const drawBadFood = (gameBoard) => {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = badFood.y;
    foodElement.style.gridColumnStart = badFood.x;
    foodElement.classList.add("badFood");
    gameBoard.appendChild(foodElement);
}