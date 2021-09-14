import React from 'react';
import PropTypes from 'prop-types';

const RatingBar = (props) => {
  return (
    <div className="rating-bar">Bar</div>
  );
};

RatingBar.propTypes = {
  star: PropTypes.number,
  percent: PropTypes.number,
  ratingCount: PropTypes.number,
};

RatingBar.defaultProps = {
  star: 1,
  percent: 0,
  ratingCount: 0,
};

export default RatingBar;
