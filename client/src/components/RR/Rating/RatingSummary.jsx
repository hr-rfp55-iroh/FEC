import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const Star = lazy(() => import('./Star'));
const RatingBreakdown = lazy(() => import('./RatingBreakdown'));
const ProductBreakdown = lazy(() => import('./ProductBreakdown'));

import { RatingPnl } from '../../GlobalStyle';

const RatingSummary = (props) => {
  const { metaData, handleRatingFilterClick } = props;
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
                <Suspense fallback={<div>Loading...</div>}>
                  <RatingPnl>
                    <Star rating={avgRating} name="rating-summary" />
                  </RatingPnl>
                </Suspense>
              )}
              &nbsp;
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
          <Suspense fallback={<div>Loading...</div>}>
            <RatingBreakdown
              ratings={ratings}
              handleRatingFilterClick={handleRatingFilterClick}
            />
            <ProductBreakdown characteristics={characteristics} />
          </Suspense>
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
};

RatingSummary.defaultProps = {
  metaData: {},
  handleRatingFilterClick: () => {},
};

export default RatingSummary;
