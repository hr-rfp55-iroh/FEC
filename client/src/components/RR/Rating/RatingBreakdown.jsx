import React from 'react';
import PropTypes from 'prop-types';

const ratingsBreakdown = (ratings) => {
  let result = [];
  const values = Object.values(ratings);
  const totalCount = values.reduce((memo, value) => memo + value);
  for (let i = 0; i < 5; i += 1) {
    let barInfo = {};
    barInfo.star = i + 1;
    barInfo.ratingCount = ratings[i + 1] || 0;
    if (totalCount) {
      barInfo.percent = barInfo.rating / totalCount;
    } else {
      barInfo.percent = 0;
    }
  }
  return result;
};

const RatingBreakdown = (props) => {
  const { ratings } = props;
  return (
    <div className="rating-breakdown">
    </div>
  );
};

RatingBreakdown.propTypes = {
  ratings: PropTypes.objectOf(PropTypes.any),
};

RatingBreakdown.defaultProps = {
  ratings: {
    1: '0',
    2: '0',
    3: '0',
    4: '0',
    5: '0',
  },
};

export default RatingBreakdown;
