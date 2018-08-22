import React, { Component } from 'react';
import {
  KEYS, DIRS, BODY, FOOD, NUMROWS, NUMCOLS,
} from './constants';
import {
  getNextIndex, ifCollision, feedFoodToTheSnake, moveSnakeOnTheBoard, genUpdateBoard,
} from './helpers';

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
    const { paused, snake, board } = this.state;
    if (paused) {
      return;
    }

    let { growth, direction } = this.state;

    const newHead = getNextIndex(snake[0], direction);

    if (ifCollision(snake, newHead)) {
      this.setState(() => ({ gameOver: true }));
      return;
    }

    const needFood = board[newHead] === FOOD || snake.length === 1;
    growth = feedFoodToTheSnake(needFood, board, snake, growth);
    moveSnakeOnTheBoard(newHead, snake, board);

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
    const cellSize = 30;
    const {
      snake, gameOver, paused, board,
    } = this.state;
    const cells = genUpdateBoard(board);

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
            width: NUMCOLS * cellSize,
            height: NUMROWS * cellSize,
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
