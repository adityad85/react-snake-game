export const ifCollision = (snake, head) => {
  if (snake.indexOf(head) !== -1) {
    return true;
  }
  return false;
};
