import React from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';

const RatingSummary = (props) => {
  const {
    metaData, handleRatingFilterClick, handleRemoveFilterClick, filter,
  } = props;
  const {
    characteristics, ratings, avgRating, ratingCount, recRate,
  } = metaData;
  return (
    <div className="rating">
      {avgRating && ratingCount && (
        <div>
          <div className="star">
            <div id="rating-avg" data-testid="rating-avg">{avgRating.toFixed(1)}</div>
            {avgRating && (
              <Star rating={avgRating} name="rating-summary" />
            )}
            <div className="rating-count">
              &#40;
              {ratingCount}
              &#41;
            </div>
          </div>
          <div className="rec-rate" data-testid="rec-rate">
            {recRate}
            % of reviews recommend this product
          </div>
          <RatingBreakdown
            ratings={ratings}
            handleRatingFilterClick={handleRatingFilterClick}
            handleRemoveFilterClick={handleRemoveFilterClick}
            filter={filter}
          />
          <ProductBreakdown characteristics={characteristics} />
        </div>
      )}
      {!ratingCount && (
        <div className="star">
          <Star rating={0} />
          &nbsp;
          Be the first to review this item
        </div>
      )}
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
