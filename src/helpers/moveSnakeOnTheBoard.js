import { BODY } from '../constants';

export const moveSnakeOnTheBoard = (newHead, snake, board) => {
  const newBoard = board;
  snake.unshift(newHead);
  newBoard[newHead] = BODY;
};
