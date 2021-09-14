import React from 'react';
import PropTypes from 'prop-types';
import ReviewList from './Review/ReviewList';
import RatingSummary from './Rating/RatingSummary';

const RatingReview = (props) => {
  const { selected } = props;
  return (
    <div>
      <h2>Ratings and Reviews</h2>
      <div className="container">
        <RatingSummary selected={selected} />
        <ReviewList selected={selected} />
      </div>

    </div>
  );
};

RatingReview.propTypes = {
  selected: PropTypes.number,
};

RatingReview.defaultProps = {
  selected: 40344,
};

export default RatingReview;
