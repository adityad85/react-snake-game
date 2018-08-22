import React, { Component } from 'react';
import {
  KEYS, BODY, FOOD,
} from './constants';
import {
  getNextIndex, ifCollision, feedFoodToTheSnake, moveSnakeOnTheBoard, updateBoard, isValidDirection,
} from './helpers';

import SnakeBoard from './SnakeBoard';
import SnakeControls from './SnakeControls';
import SnakeLength from './SnakeLength';

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
    const { prevDirection } = this.state;
    const direction = event.nativeEvent.keyCode;
    if (isValidDirection(direction, prevDirection)) {
      this.nextDirection = direction;
    }
  }


  render() {
    const cellSize = 30;
    const {
      snake, gameOver, paused, board,
    } = this.state;
    const cells = updateBoard(board);

    const { length } = snake;
    return (
      <div className="snake-game">
        <SnakeLength
          length={length}
        />
        <SnakeBoard
          reference={this.refBoard}
          pause={this.pause}
          resume={this.resume}
          handleKey={this.handleKey}
          gameOver={gameOver}
          cellSize={cellSize}
          cells={cells}
        />
        <SnakeControls
          paused={paused}
          gameOver={gameOver}
          resume={this.resume}
          reset={this.reset}
        />
      </div>
    );
  }
}

export default App;