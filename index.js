const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

// Event listeners for controller buttons
document.getElementById("upButton").addEventListener("click", function() {
    changeDirection("up");
});

document.getElementById("downButton").addEventListener("click", function() {
    changeDirection("down");
});

document.getElementById("leftButton").addEventListener("click", function() {
    changeDirection("left");
});

document.getElementById("rightButton").addEventListener("click", function() {
    changeDirection("right");
});

gameStart();


function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

function nextTick(){
    if(running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100);
    } else {
        displayGameOver();
    }
};

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score++;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
};

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((snakePart) => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
};

function changeDirection(direction) {
    switch(direction) {
        case "up":
            if (yVelocity !== unitSize) {
                xVelocity = 0;
                yVelocity = -unitSize;
            }
            break;
        case "down":
            if (yVelocity !== -unitSize) {
                xVelocity = 0;
                yVelocity = unitSize;
            }
            break;
        case "left":
            if (xVelocity !== unitSize) {
                xVelocity = -unitSize;
                yVelocity = 0;
            }
            break;
        case "right":
            if (xVelocity !== -unitSize) {
                xVelocity = unitSize;
                yVelocity = 0;
            }
            break;
    }
};

function checkGameOver() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= gameWidth ||
        snake[0].y < 0 ||
        snake[0].y >= gameHeight ||
        snake.slice(1).some(part => part.x === snake[0].x && part.y === snake[0].y)
    ) {
        running = false;
    }
};

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
};

function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
};
