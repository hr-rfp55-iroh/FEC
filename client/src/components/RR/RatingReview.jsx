import React from 'react';
import PropTypes from 'prop-types';
import ReviewList from './Review/ReviewList';
import RatingSummary from './Rating/RatingSummary';

class RatingReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // sort: 'relevant',
      filter: [],
    };
    this.handleRatingFilterClick = this.handleRatingFilterClick.bind(this);
    this.handleRemoveFilterClick = this.handleRemoveFilterClick.bind(this);
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

  render() {
    const { selected } = this.props;
    // Test for product with no review
    // const selected = 40346;

    // Test for product with different reviews
    // const selected = 40345;
    // const selected = 40347;

    const { filter } = this.state;
    return (
      <div>
        <h2>Ratings and Reviews</h2>
        <div className="container">
          <RatingSummary
            selected={selected}
            handleRatingFilterClick={this.handleRatingFilterClick}
            handleRemoveFilterClick={this.handleRemoveFilterClick}
            filter={filter}
          />
          <ReviewList selected={selected} filter={filter} />
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
