export const findPositionOfFood = (board, numRows, numCols) => {
  let positionOfFood;
  const numCells = numRows * numCols;
  do {
    positionOfFood = Math.floor(Math.random() * numCells);
  } while (board[positionOfFood]);
  return positionOfFood;
};
