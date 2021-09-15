import React from 'react';
import PropTypes from 'prop-types';
import ReviewList from './Review/ReviewList';
import RatingSummary from './Rating/RatingSummary';

class RatingReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOption: 'relevant',
      filter: [],
    };
    this.handleRatingFilterClick = this.handleRatingFilterClick.bind(this);
    this.handleRemoveFilterClick = this.handleRemoveFilterClick.bind(this);
    this.handleSortSelection = this.handleSortSelection.bind(this);
  }

  handleSortSelection(sortOption) {
    this.setState({
      sortOption,
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

  render() {
    // const { selected } = this.props;
    // Test for product with no review
    // const selected = 40346;

    // Test for product with different reviews
    const selected = 40345;
    // const selected = 40347;
    const { filter, sortOption } = this.state;
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
          <ReviewList
            selected={selected}
            filter={filter}
            sortOption={sortOption}
            handleSortSelection={this.handleSortSelection}
          />
        </div>
      </div>
    );
  }
}

RatingReview.propTypes = {
  sortOption: PropTypes.string,
  selected: PropTypes.number,
};

RatingReview.defaultProps = {
  sortOption: 'relevant',
  selected: 40344,
};

export default RatingReview;
