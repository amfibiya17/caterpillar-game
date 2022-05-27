// class Snake {
// }
// module.exports = Snake;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const speed = 7;

const tileCount = 20;
const tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

let xVelocity = 0;
let yVelocity = 0;

function clearScreen() {
  ctx.fillStyle = 'blake';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = 'white';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX += xVelocity;
  headY += yVelocity;
}

// game loop
function drawGame() {
  clearScreen();
  changeSnakePosition();
  setTimeout(drawGame, 1000 / speed);
  drawSnake();
}

function keyDown(event) {
  // up
  if (event.keyCode === 38) {
    yVelocity = -1;
    xVelocity = 0;
  }

  // down
  if (event.keyCode === 40) {
    yVelocity = 1;
    xVelocity = 0;
  }
}

document.body.addEventListener('keydown', keyDown);

drawGame();
