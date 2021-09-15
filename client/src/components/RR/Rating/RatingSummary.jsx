import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Star from './Star';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';

const ratingAverageAndCount = (ratingObj) => {
  let sum = 0;
  let count = 0;
  const keys = Object.keys(ratingObj);
  const values = Object.values(ratingObj);
  for (let i = 0; i < keys.length; i += 1) {
    sum += Number(keys[i]) * Number(values[i]);
    count += Number(values[i]);
  }
  return { avg: (sum / count).toFixed(1), count };
};

class RatingSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characteristics: {},
      ratings: {},
      avgRating: undefined,
      ratingCount: 0,
      recRate: undefined,
    };
  }

  componentDidMount() {
    this.getReviewMetadata();
  }

  getReviewMetadata() {
    const { selected } = this.props;
    axios.get('/reviews/meta/', { params: { product_id: selected } })
      .then((response) => {
        const { ratings, recommended, characteristics } = response.data;
        if (!Object.keys(ratings).length) {
          this.setState({
            characteristics,
            ratings,
            avgRating: null,
            ratingCount: 0,
            recRate: null,
          });
        } else {
          const ratingCalc = ratingAverageAndCount(ratings);
          const rec = Number(recommended.true);
          const notRec = Number(recommended.false);
          const recRate = Math.round((rec * 100) / (rec + notRec));
          this.setState({
            characteristics,
            ratings,
            avgRating: Number(ratingCalc.avg),
            ratingCount: ratingCalc.count,
            recRate,
          });
        }
      })
      .catch((err) => {
        console.log('Error getting review metadata: ', err);
      });
  }

  render() {
    const {
      characteristics, ratings, avgRating, ratingCount, recRate,
    } = this.state;
    const { handleRatingFilterClick, handleRemoveFilterClick, filter } = this.props;
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
  }
}

RatingSummary.propTypes = {
  selected: PropTypes.number,
  handleRatingFilterClick: PropTypes.func,
  handleRemoveFilterClick: PropTypes.func,
  filter: PropTypes.arrayOf(PropTypes.number),
};

RatingSummary.defaultProps = {
  selected: 40344,
  handleRatingFilterClick: () => {},
  handleRemoveFilterClick: () => {},
  filter: [],
};

export default RatingSummary;
