import { DIRS } from '../constants';

export const isValidDirection = (direction, prevDirection) => {
  const difference = Math.abs(prevDirection - direction);
  if (DIRS[direction] && difference !== 0 && difference !== 2) {
    return true;
  }
  return false;
};
