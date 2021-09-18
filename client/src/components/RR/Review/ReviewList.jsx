import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReviewTile from './ReviewTile';
import NewReviewModal from './NewReviewModal';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.handleMoreReviewsClick = this.handleMoreReviewsClick.bind(this);
    this.handleAllReviewsClick = this.handleAllReviewsClick.bind(this);
    this.handleCollapseReviewsClick = this.handleCollapseReviewsClick.bind(this);
    this.state = {
      count: 2,
    };
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

  render() {
    const { count } = this.state;
    const {
      filteredReviews, characteristics, updateRatingReview, getReviews,
    } = this.props;
    return (
      <div className="review">
        {filteredReviews.length > 0
          && (
          <ul id="review-list">
            {filteredReviews.slice(0, count).map((review) => (
              <ReviewTile review={review} getReviews={getReviews} />
            ))}
          </ul>
          )}
        {filteredReviews.length > 2
          && count < filteredReviews.length
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
        {filteredReviews.length > 2
          && count >= filteredReviews.length
          && (
          <button type="button" className="review-list-btn" onClick={this.handleCollapseReviewsClick}>
            COLLAPSE REVIEWS
          </button>
          )}
        <NewReviewModal
          characteristics={characteristics}
          updateRatingReview={updateRatingReview}
        />
      </div>
    );
  }
}

ReviewList.propTypes = {
  filteredReviews: PropTypes.arrayOf(PropTypes.any),
  characteristics: PropTypes.objectOf(PropTypes.any),
  updateRatingReview: PropTypes.func,
  getReviews: PropTypes.func,
};

ReviewList.defaultProps = {
  filteredReviews: [],
  characteristics: {},
  updateRatingReview: () => {},
  getReviews: () => {},
};

export default ReviewList;
