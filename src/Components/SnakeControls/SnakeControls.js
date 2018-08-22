import React from 'react';
import PropTypes from 'prop-types';

const SnakeControls = (props) => {
  const {
    paused, gameOver, resume, reset,
  } = props;
  return (
    <div className="snake-controls">
      {paused ? <button type="submit" onClick={resume}>Resume</button> : null}
      {gameOver ? <button type="submit" onClick={reset}>New Game</button> : null}
    </div>
  );
};

SnakeControls.propTypes = {
  paused: PropTypes.bool.isRequired,
  gameOver: PropTypes.bool.isRequired,
  resume: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default SnakeControls;
