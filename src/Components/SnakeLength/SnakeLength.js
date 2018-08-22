import React from 'react';
import PropTypes from 'prop-types';

const SnakeLength = (props) => {
  const { length } = props;
  return (
    <h1 className="snake-score">
            Length:
      {' '}
      {length}
    </h1>
  );
};

SnakeLength.propTypes = {
  length: PropTypes.number.isRequired,
};

export default SnakeLength;
