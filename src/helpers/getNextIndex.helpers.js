import { KEYS, NUMROWS, NUMCOLS } from '../constants';

export const getNextIndex = (head, direction) => {
  let x = head % NUMCOLS;
  let y = Math.floor(head / NUMCOLS);
  switch (direction) {
    case KEYS.up: y = y <= 0 ? NUMROWS - 1 : y - 1; break;
    case KEYS.down: y = y >= NUMROWS - 1 ? 0 : y + 1; break;
    case KEYS.left: x = x <= 0 ? NUMCOLS - 1 : x - 1; break;
    case KEYS.right: x = x >= NUMCOLS - 1 ? 0 : x + 1; break;
    default: break;
  }
  return ((NUMCOLS * y) + x);
};
