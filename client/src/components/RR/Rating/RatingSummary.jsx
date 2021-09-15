import React from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';

const RatingSummary = (props) => {
  const { metaData, handleRatingFilterClick, handleRemoveFilterClick, filter } = props;
  const {
    characteristics, ratings, avgRating, ratingCount, recRate,
  } = metaData;
  return (
    <div className="rating">
      {avgRating && (
        <div className="star">
          <div id="rating-avg">{avgRating}</div>
          <Star rating={avgRating} />
        </div>
      )}
      {ratingCount ? (
        <div className="rating-count">
          {ratingCount}
          &nbsp;
          ratings
        </div>
      )
        : (
          <div className="rating-count">
            No customer ratings
          </div>
        )}
      {recRate && (
        <div className="rec-rate">
          {recRate}
          % of reviews recommend this product
        </div>
      )}
      <RatingBreakdown
        ratings={ratings}
        handleRatingFilterClick={handleRatingFilterClick}
        handleRemoveFilterClick={handleRemoveFilterClick}
        filter={filter}
      />
      <ProductBreakdown characteristics={characteristics} />
    </div>
  );
};

RatingSummary.propTypes = {
  metaData: PropTypes.objectOf(PropTypes.any),
  handleRatingFilterClick: PropTypes.func,
  handleRemoveFilterClick: PropTypes.func,
  filter: PropTypes.arrayOf(PropTypes.number),
};

RatingSummary.defaultProps = {
  metaData: {},
  handleRatingFilterClick: () => {},
  handleRemoveFilterClick: () => {},
  filter: [],
};

export default RatingSummary;
