import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReviewList from './Review/ReviewList';
import RatingSummary from './Rating/RatingSummary';

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

class RatingReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      metaData: {},
      filter: [],
      sort: 'relevant',
    };
    this.handleRatingFilterClick = this.handleRatingFilterClick.bind(this);
    this.handleRemoveFilterClick = this.handleRemoveFilterClick.bind(this);
    this.handleSortSelection = this.handleSortSelection.bind(this);
    this.updateRatingReview = this.updateRatingReview.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    this.updateRatingReview();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.props;
    const { sort } = this.state;
    if (prevProps.selected !== selected || prevState.sort !== sort) {
      this.updateRatingReview();
    }
  }

  handleSortSelection(e) {
    this.setState({
      sort: e.target.value,
    });
  }

  handleRatingFilterClick(star) {
    const { filter } = this.state;
    const filterOptions = filter.slice();
    const matchInd = filterOptions.indexOf(star);
    if (matchInd === -1) {
      filterOptions.push(star);
    } else {
      filterOptions.splice(matchInd, 1);
    }
    this.setState({
      filter: filterOptions,
    });
  }

  handleRemoveFilterClick() {
    this.setState({
      filter: [],
    });
  }

  getReviews() {
    const { selected } = this.props;
    const { sort } = this.state;
    axios.get('/reviews/', { params: { product_id: selected, sort } })
      .then((response) => {
        this.setState({
          reviews: response.data,
        });
      })
      .catch((err) => {
        console.log('Error getting review data: ', err);
      });
  }

  getReviewMetadata() {
    const { selected, updateAvgRating } = this.props;
    axios.get('/reviews/meta/', { params: { product_id: selected } })
      .then((response) => {
        const { ratings, recommended, characteristics } = response.data;
        if (!Object.keys(ratings).length) {
          this.setState({
            metaData: {
              characteristics,
              ratings,
              avgRating: null,
              ratingCount: 0,
              recRate: null,
            },
          });
        } else {
          const ratingCalc = ratingAverageAndCount(ratings);
          const rec = Number(recommended.true) || 0;
          const notRec = Number(recommended.false) || 0;
          const recRate = Math.round((rec * 100) / (rec + notRec));
          this.setState({
            metaData: {
              characteristics,
              ratings,
              avgRating: Number(ratingCalc.avg),
              ratingCount: ratingCalc.count,
              recRate,
            },
          });
        }
      })
      .then(() => {
        const { metaData } = this.state;
        const { avgRating } = metaData;
        updateAvgRating(avgRating);
      })
      .catch((err) => {
        console.log('Error getting review metadata: ', err);
      });
  }

  updateRatingReview() {
    this.getReviewMetadata();
    this.getReviews();
  }

  render() {
    const { selected } = this.props;
    const { reviews, metaData, filter } = this.state;
    const { characteristics } = metaData;
    let filteredReviews = reviews.slice();
    if (filter.length) {
      filteredReviews = reviews.filter((review) => filter.indexOf(review.rating) !== -1);
    }
    return (
      <div style={{ height: '100%' }}>
        <div className="container">
          <RatingSummary
            metaData={metaData}
            filter={filter}
            handleRatingFilterClick={this.handleRatingFilterClick}
            handleRemoveFilterClick={this.handleRemoveFilterClick}
          />
          <div className="review">
            {reviews.length !== 0 && (
            <div id="review-sort-bar">
              {filteredReviews.length}
              &nbsp;
              Reviews,
              <label htmlFor="sort-options">
                &nbsp;
                Sort on
                &nbsp;
                <select name="sort-options" id="sort-options" onChange={this.handleSortSelection} defaultValue="relevant">
                  <option value="relevant">Relevant</option>
                  <option value="helpful">Helpful</option>
                  <option value="newest">Newest</option>
                </select>
              </label>
            </div>
            )}
            <ReviewList
              filteredReviews={filteredReviews}
              characteristics={characteristics}
              updateRatingReview={this.updateRatingReview}
              getReviews={this.getReviews}
              selected={selected}
            />
          </div>
        </div>
      </div>
    );
  }
}

RatingReview.propTypes = {
  selected: PropTypes.number,
  updateAvgRating: PropTypes.func,
};

RatingReview.defaultProps = {
  selected: 40344,
  updateAvgRating: () => {},
};

export default RatingReview;
