import React from 'react';
import PropTypes from 'prop-types';
import ReviewList from './Review/ReviewList';

const RatingReview = (props) => {
  const { selected } = props;
  return (
    <div>
      <h2>Ratings and Reviews</h2>
      <ReviewList selected={selected} />
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
