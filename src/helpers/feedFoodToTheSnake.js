import { findPositionOfFood } from './findPositionOfFood';
import { FOOD, NUMROWS, NUMCOLS } from '../constants';

export const feedFoodToTheSnake = (needFood, board, snake, growth) => {
  const updatedBoard = board;
  let growthUpdated = growth;
  if (needFood) {
    const positionOfFood = findPositionOfFood(updatedBoard, NUMROWS, NUMCOLS);
    updatedBoard[positionOfFood] = FOOD;
    growthUpdated += 1;
  } else {
    growthUpdated = 0;
    updatedBoard[snake.pop()] = null;
  }

  return growthUpdated;
};
