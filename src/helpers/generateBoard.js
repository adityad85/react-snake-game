import React from 'react';

import {
  BODY, FOOD, NUMROWS, NUMCOLS,
} from '../constants';

export const genUpdateBoard = (board) => {
  const cells = [];

  let unique = 0;
  for (let row = 0; row < NUMROWS; row += 1) {
    for (let col = 0; col < NUMCOLS; col += 1) {
      const code = board[NUMCOLS * row + col];
      let type = code === BODY ? 'body' : null;
      if (type === null) {
        type = code === FOOD ? 'food' : null;
      }
      unique += 1;
      cells.push(<div className={`${type}-cell`} key={`${unique}`} />);
    }
  }
  return cells;
};
