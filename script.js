
const player = document.getElementById("player");
const obstaclesContainer = document.getElementById("obstacles");
let playerX = 0;
let playerY = 0;
let isJumping = false;
let jumpHeight = 120;
let gameInterval;

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && playerX < 760) {
        playerX += 10;
    } else if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 10;
    } else if (event.key === "ArrowUp" && !isJumping) {
        isJumping = true;
        jump();
    }
});

function startGame() {
    gameInterval = setInterval(updateGameArea, 20);
}

function updateGameArea() {
    clearObstacles();
    createObstacle();
    moveObstacles();
    updatePlayerPosition();
    checkCollision();
}

function clearObstacles() {
    obstaclesContainer.innerHTML = "";
}

function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.className = "obstacle";
    obstacle.style.bottom = "0px";
    obstaclesContainer.appendChild(obstacle);
}

function moveObstacles() {
    const obstacles = document.querySelectorAll(".obstacle");
    obstacles.forEach((obstacle) => {
        const obstacleBottom = parseInt(obstacle.style.bottom);
        if (obstacleBottom > -50) {
            obstacle.style.bottom = `${obstacleBottom + 5}px`;
        } else {
            obstacle.remove();
        }
    });
}

function updatePlayerPosition() {
    player.style.left = `${playerX}px`;
    player.style.bottom = `${playerY}px`;
}

function jump() {
    let currentHeight = 0;

    const jumpInterval = setInterval(() => {
        if (currentHeight >= jumpHeight) {
            clearInterval(jumpInterval);
            isJumping = false;
            fall();
        } else {
            playerY += 2;
            currentHeight += 2;
            updatePlayerPosition();
        }
    }, 10);
}

function fall() {
    const fallInterval = setInterval(() => {
        if (playerY <= 0) {
            clearInterval(fallInterval);
            playerY = 0;
            updatePlayerPosition();
        } else {
            playerY -= 2;
            updatePlayerPosition();
        }
    }, 10);
}

function checkCollision() {
    const obstacles = document.querySelectorAll(".obstacle");
    obstacles.forEach((obstacle) => {
        const obstacleLeft = parseInt(obstacle.style.left);
        const obstacleBottom = parseInt(obstacle.style.bottom);
        if (
            obstacleLeft <= playerX + 40 &&
            obstacleLeft + 40 >= playerX &&
            obstacleBottom <= playerY + 40
        ) {
            clearInterval(gameInterval);
            alert("Game Over! You crashed into an obstacle.");
            location.reload(); // Restart the game
        }
    });
}

startGame();
