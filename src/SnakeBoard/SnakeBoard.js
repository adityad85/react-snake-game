import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NUMCOLS, NUMROWS, CELLSIZE } from '../constants';

class SnakeBoard extends Component {
  render() {
    const {
      reference, pause, resume, handleKey, cells, gameOver,
    } = this.props;
    return (
      <div
        ref={reference}
        className={`snake-board${gameOver ? ' game-over' : ''}`}
        tabIndex="0"
        role="grid"
        onBlur={pause}
        onFocus={resume}
        onKeyDown={handleKey}
        style={{
          width: NUMCOLS * CELLSIZE,
          height: NUMROWS * CELLSIZE,
        }}
      >
        {cells}
      </div>
    );
  }
}

SnakeBoard.propTypes = {
  pause: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
  handleKey: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
  reference: PropTypes.shape({}).isRequired,
  cells: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

};

export default SnakeBoard;
