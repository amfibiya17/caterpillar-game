/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './home.html'), 'utf8');

jest.dontMock('fs');

describe('SnakePart', () => {
  let SnakePart;

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    SnakePart = require('./snake').SnakePart;
  });

  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });

  it('SnakePart has x and y', () => {
    const snake = new SnakePart(5, 10);
    expect(snake.x).toBe(5);
    expect(snake.y).toBe(10);
  });
});
