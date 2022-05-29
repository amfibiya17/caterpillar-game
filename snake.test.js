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

describe('keyDown function', () => {
  let exportedVars;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    exportedVars = require('./snake');
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('moving up when pressing up keyboard', () => {
    // let event = new KeyboardEvent('keydown', {'keyCode': 38});
    // document.dispatchEvent(event);
    // exportedVars.keyDown({ keyCode: 38 });

    // expect(require('./snake').yVelocity).toBe(-1);
  });

  // it('', () => {
    
  // });

  // it('', () => {
    
  // });

  // it('', () => {
    
  // });
});
