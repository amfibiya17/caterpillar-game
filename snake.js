/* eslint-disable no-use-before-define */
// eslint-disable-next-line max-classes-per-file
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Game {
  // eslint-disable-next-line no-shadow
  constructor(canvas, gulpSound, gameSound) {
    this.canvas = canvas;
    this.gulpSound = gulpSound;
    this.gameSound = gameSound;
    this.ctx = this.canvas.getContext('2d');
    this.speed = 6;
    this.tileCount = 20;
    this.tileSize = this.canvas.width / this.tileCount - 2;
    this.headX = 10;
    this.headY = 10;
    this.snakeParts = [];
    this.tailLength = 2;
    this.appleX = 5;
    this.appleY = 5;
    this.score = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.previousXVelocity = 0;
    this.previousYVelocity = 0;

    document.body.addEventListener('keydown', this.keyDown.bind(this));
  }

  drawGame() {
    console.log('drawing...');
    // Was moving right add trying to move left
    if (this.previousXVelocity === 1 && this.xVelocity === -1) {
      this.xVelocity = this.previousXVelocity;
    }
    // Was moving left add trying to move right
    if (this.previousXVelocity === -1 && this.xVelocity === 1) {
      this.xVelocity = this.previousXVelocity;
    }
    // Was moving up add trying to move down
    if (this.previousYVelocity === 1 && this.yVelocity === -1) {
      this.yVelocity = this.previousYVelocity;
    }
    // Was moving down add trying to move up
    if (this.previousYVelocity === -1 && this.yVelocity === 1) {
      this.yVelocity = this.previousYVelocity;
    }
    this.previousXVelocity = this.xVelocity;
    this.previousYVelocity = this.yVelocity;

    this.changeSnakePosition();
    const result = this.isGameOver();
    if (result) {
      console.log('Game Over! Refresh to play again!');
      document.body.removeEventListener('keydown', this.keyDown.bind(this));
      return;
    }

    this.clearScreen();

    this.checkAppleCollision();
    this.drawApple();
    this.drawSnake();

    this.drawScore();

    setTimeout(this.drawGame.bind(this), 1000 / this.speed);
  }

  isGameOver() {
    let gameOver = false;

    if (this.xVelocity === 0 && this.yVelocity === 0) {
      return false;
    }

    // walls
    if (this.headX < 0) {
      gameOver = true;
      gameSound.play();
    } else if (this.headX === this.tileCount) {
      gameOver = true;
      gameSound.play();
    } else if (this.headY < 0) {
      gameOver = true;
      gameSound.play();
    } else if (this.headY === this.tileCount) {
      gameOver = true;
      gameSound.play();
    }

    for (let i = 0; i < this.snakeParts.length; i += 1) {
      const part = this.snakeParts[i];
      if (part.x === this.headX && part.y === this.headY) {
        gameOver = true;
        gameSound.play();
        break;
      }
    }

    if (gameOver) {
      this.ctx.fileStyle = 'white';
      this.ctx.font = '17px Verdana';

      this.ctx.fillText('Game Over! Refresh to play again!', canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
  }

  drawScore() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '10px Verdana';
    this.ctx.fillText(`Score ${this.score}`, canvas.width - 50, 10);
  }

  clearScreen() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSnake() {
    this.ctx.fillStyle = 'green';
    for (let i = 0; i < this.snakeParts.length; i += 1) {
      const part = this.snakeParts[i];
      this.ctx.fillRect(
        part.x * this.tileCount,
        part.y * this.tileCount,
        this.tileSize,
        this.tileSize
      );
    }

    this.snakeParts.push(new SnakePart(this.headX, this.headY)); // putting the item at the end of the list next to the head
    if (this.snakeParts.length > this.tailLength) {
      this.snakeParts.shift(); // removing the furthers item from the snake parts if have more than our tailSize
    }

    this.ctx.fillStyle = 'orange';
    this.ctx.fillRect(
      this.headX * this.tileCount,
      this.headY * this.tileCount,
      this.tileSize,
      this.tileSize
    );
  }

  changeSnakePosition() {
    this.headX += this.xVelocity;
    this.headY += this.yVelocity;
  }

  drawApple() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      this.appleX * this.tileCount,
      this.appleY * this.tileCount,
      this.tileSize,
      this.tileSize
    );
  }

  checkAppleCollision() {
    if (this.appleX === this.headX && this.appleY === this.headY) {
      this.appleX = Math.floor(Math.random() * this.tileCount);
      this.appleY = Math.floor(Math.random() * this.tileCount);
      this.tailLength += 1;
      this.score += 1;
      this.speed += 1;
      gulpSound.play();
    }
  }

  keyDown(event) {
    console.log(this);
    // Up
    if (event.keyCode === 38 || event.keyBoard === 87) {
      if (this.yVelocity === 1) return; // <- preventing to go back opposite direction and exit the keyDown function
      this.yVelocity = -1;
      this.xVelocity = 0;
    }

    // Down
    if (event.keyCode === 40 || event.keyBoard === 83) {
      if (this.yVelocity === -1) return;
      this.yVelocity = 1;
      this.xVelocity = 0;
    }

    // Left
    if (event.keyCode === 37 || event.keyBoard === 65) {
      if (this.xVelocity === 1) return;
      this.yVelocity = 0;
      this.xVelocity = -1;
    }

    // Right
    if (event.keyCode === 39 || event.keyBoard === 68) {
      if (this.xVelocity === -1) return;
      this.yVelocity = 0;
      this.xVelocity = 1;
    }
  }
}

const canvas = document.getElementById('game');
const gulpSound = new Audio('gulp.mp3');
const gameSound = new Audio('gameSound.mp3');
const game = new Game(canvas, gulpSound, gameSound);

game.drawGame();

// module.exports = {
//   SnakePart,
//   keyDown,
//   velocities,
// };
