import React from 'react';
import PropTypes from 'prop-types';
import RatingBar from './RatingBar';
import FilterLabel from './FilterLabel';

const ratingsBreakdown = (ratings) => {
  const result = [];
  const values = Object.values(ratings);
  const totalCount = values.reduce((memo, value) => memo + Number(value), 0);
  for (let i = 4; i >= 0; i -= 1) {
    const barInfo = {};
    barInfo.star = i + 1;
    barInfo.ratingCount = ratings[i + 1] || 0;
    if (totalCount) {
      barInfo.percent = Math.round((Number(barInfo.ratingCount) * 100) / totalCount);
    } else {
      barInfo.percent = 0;
    }
    result.push(barInfo);
  }
  return result;
};

const RatingBreakdown = (props) => {
  const {
    ratings, handleRatingFilterClick, handleRemoveFilterClick, filter,
  } = props;
  const barInfo = ratingsBreakdown(ratings);
  return (
    <div className="rating-breakdown">
      <div className="rating-header">Rating Breakdown</div>
      <div className="rating-filter-label">
        {filter.length > 0
          && (
            <FilterLabel
              filter={filter}
              handleRatingFilterClick={handleRatingFilterClick}
              handleRemoveFilterClick={handleRemoveFilterClick}
            />
          )}
      </div>
      {barInfo.map((info, index) => {
        const barCount = index + 1;
        return (
          <RatingBar
            info={info}
            handleRatingFilterClick={handleRatingFilterClick}
            key={`bar-${barCount}`}
          />
        );
      })}
    </div>
  );
};

RatingBreakdown.propTypes = {
  ratings: PropTypes.objectOf(PropTypes.any),
  handleRatingFilterClick: PropTypes.func,
  handleRemoveFilterClick: PropTypes.func,
  filter: PropTypes.arrayOf(PropTypes.number),
};

RatingBreakdown.defaultProps = {
  ratings: {
    1: '0',
    2: '0',
    3: '0',
    4: '0',
    5: '0',
  },
  handleRatingFilterClick: () => {},
  handleRemoveFilterClick: () => {},
  filter: [],
};

export default RatingBreakdown;
