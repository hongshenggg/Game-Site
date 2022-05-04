let inputDirection = {x:0, y:1};
const moveLeft = {x:-1, y:0};
const moveRight = {x:1, y:0};
const moveUp = {x:0, y:-1};
const moveDown = {x:0, y:1};
let prevInputDirection = moveDown;

window.addEventListener("keydown", event =>{
    if (event.key === "ArrowUp" && prevInputDirection !== moveDown) {
        inputDirection = {x:0, y:-1};
        prevInputDirection = moveUp;
    } else if (event.key === "ArrowDown" && prevInputDirection !== moveUp) {
        inputDirection = {x:0, y:1};
        prevInputDirection = moveDown;
    } else if (event.key === "ArrowLeft" && prevInputDirection !== moveRight) {
        inputDirection = {x:-1, y:0};
        prevInputDirection = moveLeft;
    } else if (event.key === "ArrowRight" && prevInputDirection !== moveLeft) {
        inputDirection = {x:1, y:0};
        prevInputDirection = moveRight;
    }
});

const getInputDirection = () => {
    return inputDirection;
}
