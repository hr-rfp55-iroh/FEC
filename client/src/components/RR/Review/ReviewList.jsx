import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReviewTile from './ReviewTile';
import NewReviewModal from './NewReviewModal';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 2,
      value: '',
    };
    this.handleMoreReviewsClick = this.handleMoreReviewsClick.bind(this);
    this.handleAllReviewsClick = this.handleAllReviewsClick.bind(this);
    this.handleCollapseReviewsClick = this.handleCollapseReviewsClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  handleMoreReviewsClick() {
    let { count } = this.state;
    this.setState({
      count: count += 2,
    });
  }

  handleAllReviewsClick() {
    const { filteredReviews } = this.props;
    this.setState({
      count: filteredReviews.length,
    });
  }

  handleCollapseReviewsClick() {
    this.setState({
      count: 2,
    });
  }

  handleSearchInputChange(e) {
    if (e.target.value.length > 2) {
      this.setState({
        value: e.target.value,
      });
    } else {
      this.setState({
        value: e.target.value,
      });
    }
  }

  render() {
    const { count, value } = this.state;
    const {
      filteredReviews, characteristics, updateRatingReview, getReviews, selected,
    } = this.props;
    let searchedReviews = filteredReviews.slice();
    if (value.length > 2) {
      searchedReviews = filteredReviews.filter((review) => {
        const text = review.summary + review.body;
        return text.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
    }
    return (
      <div className="review-list-container">
        <div id="review-search-bar">
          <input
            type="text"
            value={value}
            id="review-search-input"
            placeholder="Search within reviews"
            onChange={this.handleSearchInputChange}
          />
          &#x1F50E;
        </div>
        {value.length > 2
          && (
            <div className="review-search-note">{`${searchedReviews.length} review${searchedReviews.length > 1 ? 's' : ''} mentioning “${value}”`}</div>
          )}
        {searchedReviews.length > 0
          && (
          <ul id="review-list">
            {searchedReviews.slice(0, count).map((review) => (
              <ReviewTile review={review} getReviews={getReviews} />
            ))}
          </ul>
          )}
        {searchedReviews.length > 2
          && count < searchedReviews.length
          && (
            <div>
              <button type="button" className="review-list-btn" onClick={this.handleMoreReviewsClick}>
                MORE REVIEWS
              </button>
              <button type="button" className="review-list-btn" onClick={this.handleAllReviewsClick}>
                ALL REVIEWS
              </button>
            </div>
          )}
        {searchedReviews.length > 2
          && count >= searchedReviews.length
          && (
          <button type="button" className="review-list-btn" onClick={this.handleCollapseReviewsClick}>
            COLLAPSE REVIEWS
          </button>
          )}
        <NewReviewModal
          selected={selected}
          characteristics={characteristics}
          updateRatingReview={updateRatingReview}
        />
      </div>
    );
  }
}

ReviewList.propTypes = {
  selected: PropTypes.number,
  filteredReviews: PropTypes.arrayOf(PropTypes.any),
  characteristics: PropTypes.objectOf(PropTypes.any),
  updateRatingReview: PropTypes.func,
  getReviews: PropTypes.func,
};

ReviewList.defaultProps = {
  selected: 0,
  filteredReviews: [],
  characteristics: {},
  updateRatingReview: () => {},
  getReviews: () => {},
};

export default ReviewList;
