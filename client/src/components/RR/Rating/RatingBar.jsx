import React from 'react';
import PropTypes from 'prop-types';

const RatingBar = (props) => {
  const { info, handleRatingFilterClick } = props;
  const { star, percent, ratingCount } = info;
  const handleBarClick = () => {
    handleRatingFilterClick(star);
  };
  return (
    <div className="bar" onClick={handleBarClick} onKeyPress={handleBarClick} role="presentation">
      <div className="rating-star-label">
        {star}
        &nbsp;
        stars
      </div>
      <div className="rating-bar">
        <div style={{ height: '100%', width: `${percent}%`, backgroundColor: 'green' }} />
      </div>
      <div className="rating-count-label">
        {ratingCount}
      </div>
    </div>

  );
};

RatingBar.propTypes = {
  info: PropTypes.objectOf(PropTypes.any),
  handleRatingFilterClick: PropTypes.func,
};

RatingBar.defaultProps = {
  info: {
    star: 1,
    percent: 0,
    ratingCount: 0,
  },
  handleRatingFilterClick: () => {},
};

export default RatingBar;
