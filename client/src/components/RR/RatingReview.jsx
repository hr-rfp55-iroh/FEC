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
      filter: [],
      metaData: {},
    };
    this.handleRatingFilterClick = this.handleRatingFilterClick.bind(this);
    this.handleRemoveFilterClick = this.handleRemoveFilterClick.bind(this);
    this.handleSortSelection = this.handleSortSelection.bind(this);
  }

  componentDidMount() {
    this.getReviewMetadata();
  }

  handleSortSelection() {
    this.getReviewMetadata();
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

  getReviewMetadata() {
    const { selected } = this.props;
    // const selected = 40436;
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
          const rec = Number(recommended.true);
          const notRec = Number(recommended.false);
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
      .catch((err) => {
        console.log('Error getting review metadata: ', err);
      });
  }

  render() {
    const { selected } = this.props;
    // const selected = 40436;
    const { filter, metaData } = this.state;
    const { characteristics } = metaData;
    return (
      <div>
        <h2>Ratings and Reviews</h2>
        <div className="container">
          <RatingSummary
            metaData={metaData}
            handleRatingFilterClick={this.handleRatingFilterClick}
            handleRemoveFilterClick={this.handleRemoveFilterClick}
            filter={filter}
          />
          <ReviewList
            selected={selected}
            filter={filter}
            handleSortSelection={this.handleSortSelection}
            characteristics={characteristics}
          />
        </div>
      </div>
    );
  }
}

RatingReview.propTypes = {
  selected: PropTypes.number,
};

RatingReview.defaultProps = {
  selected: 40344,
};

export default RatingReview;
