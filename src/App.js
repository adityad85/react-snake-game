import React, { Component } from 'react';
import {
  KEYS, DIRS, BODY, FOOD,
} from './constants';
import { getNextIndex, ifCollision, findPositionOfFood } from './helpers';

class App extends Component {
  constructor(props) {
    super(props);
    const start = 21;
    const snake = [start];
    const board = [];
    this.refBoard = React.createRef();
    board[start] = BODY;
    this.state = {
      snake,
      board,
      paused: true,
      gameOver: false,
      direction: KEYS.right,
      growth: 0,
    };
  }

  componentDidMount() {
    this.resume();
  }

  reset = async () => {
    const start = 21;
    const snake = [start];
    const board = [];
    board[start] = BODY;
    await this.setState(() => ({
      snake,
      board,
      paused: true,
      gameOver: false,
      direction: KEYS.right,
      growth: 0,
    }));
    this.resume();
  }

  pause = () => {
    const { gameOver, paused } = this.state;
    if (gameOver || paused) {
      return;
    }
    this.setState(() => ({ paused: true }));
  }

  resume = async () => {
    const { gameOver, paused } = this.state;
    if (gameOver || !paused) {
      return;
    }
    // necessary as set state is async and need it updated as soon as it encounters
    await this.setState(() => ({ paused: false }));

    this.refBoard.current.focus();
    this.move();
  }

  move = () => {
    const { paused } = this.state;
    if (paused) {
      return;
    }

    const {
      snake, board, numRows = 20, numCols = 20,
    } = this.state;
    let { growth, direction } = this.state;

    const head = getNextIndex(snake[0], direction, numRows, numCols);

    if (ifCollision(snake, head)) {
      this.setState(() => ({ gameOver: true }));
      return;
    }

    const needFood = board[head] === FOOD || snake.length === 1;

    if (needFood) {
      const positionOfFood = findPositionOfFood(board, numRows, numCols);
      board[positionOfFood] = FOOD;
      growth += 1;
    } else {
      growth = 0;
      board[snake.pop()] = null;
    }

    snake.unshift(head);
    board[head] = BODY;

    if (this.nextDirection) {
      direction = this.nextDirection;
      this.nextDirection = null;
    }

    this.setState(() => ({
      snake, board, growth, direction,
    }));

    setTimeout(this.move, 100);
  }

  handleKey = (event) => {
    event.preventDefault();
    const { tempDirection } = this.state;
    const direction = event.nativeEvent.keyCode;
    const difference = Math.abs(tempDirection - direction);

    if (DIRS[direction] && difference !== 0 && difference !== 2) {
      this.nextDirection = direction;
    }
  }


  render() {
    const cells = [];

    const numRows = 20;
    const numCols = 20;
    const cellSize = 30;
    let unique = 0;
    for (let row = 0; row < numRows; row += 1) {
      for (let col = 0; col < numCols; col += 1) {
        const { board } = this.state;
        const code = board[numCols * row + col];
        let type = code === BODY ? 'body' : null;
        if (type === null) {
          type = code === FOOD ? 'food' : null;
        }
        unique += 1;
        cells.push(<div className={`${type}-cell`} key={`${unique}`} />);
      }
    }

    const { snake, gameOver, paused } = this.state;
    const { length } = snake;
    return (
      <div className="snake-game">
        <h1 className="snake-score">
          Length:
          {' '}
          {length}
        </h1>
        <div
          ref={this.refBoard}
          className={`snake-board${gameOver ? ' game-over' : ''}`}
          tabIndex="0"
          role="grid"
          onBlur={this.pause}
          onFocus={this.resume}
          onKeyDown={this.handleKey}
          style={{
            width: numCols * cellSize,
            height: numRows * cellSize,
          }}
        >
          {cells}
        </div>
        <div className="snake-controls">
          {paused ? <button type="submit" onClick={this.resume}>Resume</button> : null}
          {gameOver ? <button type="submit" onClick={this.reset}>New Game</button> : null}
        </div>
      </div>
    );
  }
}

export default App;
