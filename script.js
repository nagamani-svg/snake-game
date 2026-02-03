const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};

let direction = "RIGHT";
let score = 0;

document.addEventListener("keydown", keyDown);

function keyDown(e) {
    if (e.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
    else if (e.keyCode == 38 && direction != "DOWN") direction = "UP";
    else if (e.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
    else if (e.keyCode == 40 && direction != "UP") direction = "DOWN";
}

function changeDir(dir) {
    if (dir === "left" && direction != "RIGHT") direction = "LEFT";
    if (dir === "up" && direction != "DOWN") direction = "UP";
    if (dir === "right" && direction != "LEFT") direction = "RIGHT";
    if (dir === "down" && direction != "UP") direction = "DOWN";
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "#00e676" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction == "LEFT") headX -= box;
    if (direction == "UP") headY -= box;
    if (direction == "RIGHT") headX += box;
    if (direction == "DOWN") headY += box;

    // Eat food
    if (headX == food.x && headY == food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop();
    }

    const newHead = { x: headX, y: headY };

    // Game Over
    if (
        headX < 0 || headY < 0 ||
        headX >= canvas.width || headY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
        location.reload();
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(draw, 120);