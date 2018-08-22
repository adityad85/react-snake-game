import { KEYS } from '../constants';

export const getNextIndex = (head, direction, numRows, numCols) => {
  let x = head % numCols;
  let y = Math.floor(head / numCols);
  switch (direction) {
    case KEYS.up: y = y <= 0 ? numRows - 1 : y - 1; break;
    case KEYS.down: y = y >= numRows - 1 ? 0 : y + 1; break;
    case KEYS.left: x = x <= 0 ? numCols - 1 : x - 1; break;
    case KEYS.right: x = x >= numCols - 1 ? 0 : x + 1; break;
    default: break;
  }
  return ((numCols * y) + x);
};
