/* eslint-disable no-use-before-define */

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// module.exports = SnakePart;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let speed = 6;

const tileCount = 20;
const tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio('gulp.mp3');
const gameSound = new Audio('gameSound.mp3');

// Game loop
function drawGame() {
  changeSnakePosition();
  const result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  if (score > 2) {
    speed = 9;
  }
  if (score > 5) {
    speed = 12;
  }
  if (score > 7) {
    speed = 15;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (xVelocity === 0 && yVelocity === 0) {
    return false;
  }

  // walls
  if (headX < 0) {
    gameOver = true;
    gameSound.play();
  } else if (headX === tileCount) {
    gameOver = true;
    gameSound.play();
  } else if (headY < 0) {
    gameOver = true;
    gameSound.play();
  } else if (headY === tileCount) {
    gameOver = true;
    gameSound.play();
  }

  for (let i = 0; i < snakeParts.length; i += 1) {
    const part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      gameSound.play();
      break;
    }
  }

  if (gameOver) {
    ctx.fileStyle = 'white';
    ctx.font = '50px Verdana';

    ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '10px Verdana';
  ctx.fillText(`Score ${score}`, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeParts.length; i += 1) {
    const part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY)); // putting the item at the end of the list next to the head
  if (snakeParts.length > tailLength) {
    snakeParts.shift(); // removing the furthers item from the snake parts if have more than our tailSize
  }

  ctx.fillStyle = 'orange';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX += xVelocity;
  headY += yVelocity;
}
function drawApple() {
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength += 1;
    score += 1;
    gulpSound.play();
  }
}

function keyDown(event) {
  // Up
  if (event.keyCode === 38) {
    if (yVelocity === 1) return; // <- preventing to go back opposite direction and exit the keyDown function
    yVelocity = -1;
    xVelocity = 0;
  }

  // Down
  if (event.keyCode === 40) {
    if (yVelocity === -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }

  // Left
  if (event.keyCode === 37) {
    if (xVelocity === 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }

  // Right
  if (event.keyCode === 39) {
    if (xVelocity === -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

document.body.addEventListener('keydown', keyDown);

drawGame();
