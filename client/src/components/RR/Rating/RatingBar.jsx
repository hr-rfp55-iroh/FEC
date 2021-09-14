import React from 'react';
import PropTypes from 'prop-types';

const RatingBar = (props) => {
  const { info } = props;
  const { star, percent, ratingCount } = info;
  return (
    <div className="bar">
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
        &nbsp;
        reviews
      </div>
    </div>

  );
};

RatingBar.propTypes = {
  info: PropTypes.objectOf(PropTypes.any);
};

RatingBar.defaultProps = {
  info = {
    star: 1,
    percent: 0,
    ratingCount: 0,
  },
};

export default RatingBar;
