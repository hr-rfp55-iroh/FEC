import React from 'react';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';

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
    this.handleRemoveSearchInput = this.handleRemoveSearchInput.bind(this);
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

  handleRemoveSearchInput() {
    this.setState({
      value: '',
    });
  }

  render() {
    const { count, value } = this.state;
    const {
      filteredReviews, getReviews,
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
        {filteredReviews.length !== 0 && (
        <div className="search-wrapper">
          <img src="./static/magnifying.svg" height="20px" alt="right-arrow" />
          <input
            type="text"
            value={value}
            className="search-input"
            placeholder="Search within reviews..."
            onChange={this.handleSearchInputChange}
          />
          {value.length !== 0 && (
            <div onClick={this.handleRemoveSearchInput} role="presentation" className="remove-input-btn">
              <img src="./static/close.svg" height="20px" alt="right-arrow" />
            </div>
          )}
        </div>
        )}
        {value.length > 2
          && (
            <div className="review-search-note">{`${searchedReviews.length} review${searchedReviews.length > 1 ? 's' : ''} mentioning “${value}”`}</div>
          )}
        {searchedReviews.length > 0
          && (
          <ul id="review-list">
            {searchedReviews.slice(0, count).map((review, index) => {
              const reviewCount = index + 1;
              return (
                <ReviewTile review={review} getReviews={getReviews} key={`review-${reviewCount}`} />
              );
            })}
          </ul>
          )}
        {searchedReviews.length > 2
          && count < searchedReviews.length
          && (
            <div className="review-btn-list">
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
            <div className="review-btn-list">
              <button type="button" className="review-list-btn" onClick={this.handleCollapseReviewsClick}>
                COLLAPSE REVIEWS
              </button>
            </div>
          )}
      </div>
    );
  }
}

ReviewList.propTypes = {
  filteredReviews: PropTypes.arrayOf(PropTypes.any),
  getReviews: PropTypes.func,
};

ReviewList.defaultProps = {
  filteredReviews: [],
  getReviews: () => {},
};

export default ReviewList;
