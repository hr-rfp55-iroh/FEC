import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReviewTile from './ReviewTile';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.handleMoreReviewsClick = this.handleMoreReviewsClick.bind(this);
    this.state = {
      reviews: [],
      count: 2,
    };
  }

  componentDidMount() {
    this.getReviews();
  }

  handleMoreReviewsClick() {
    let { count } = this.state;
    this.setState({
      count: count += 2,
    });
  }

  getReviews() {
    const { selected } = this.props;
    console.log('this is selected', selected);
    axios.get('/reviews/', { params: { product_id: selected } })
      .then((response) => {
        this.setState({
          reviews: response.data,
        });
      })
      .catch((err) => {
        console.log('Error getting review data: ', err);
      });
  }

  render() {
    const { reviews, count } = this.state;
    const { filter } = this.props;
    let filteredReviews = reviews.slice();
    if (filter.length) {
      filteredReviews = reviews.filter((review) => filter.indexOf(review.rating) !== -1);
    }
    return (
      <div className="review">
        <div>
          {filteredReviews.length}
          &nbsp;
          reviews,
          <label htmlFor="sort-options">
            &nbsp;
            Sort on
            &nbsp;
            <select name="sort-options" id="sort-options">
              <option value="helpful">Helpful</option>
              <option value="newest">Newest</option>
              <option value="relevant" selected>Relevant</option>
            </select>
          </label>
        </div>
        {filteredReviews.length > 0
          && (
          <ul id="review-list">
            {filteredReviews.slice(0, count).map((review) => (
              <ReviewTile review={review} />
            ))}
          </ul>
          )}
        {filteredReviews.length > 2
          && count < filteredReviews.length
          && (
            <button type="button" className="review-list-btn" onClick={this.handleMoreReviewsClick}>
              MORE REVIEWS
            </button>
          )}
        <button type="button" className="review-list-btn">
          ADD A REVIEW
        </button>
      </div>
    );
  }
}

ReviewList.propTypes = {
  selected: PropTypes.number,
  filter: PropTypes.arrayOf(PropTypes.number),
};

ReviewList.defaultProps = {
  selected: 40344,
  filter: [1, 2, 3, 4, 5],
};

export default ReviewList;
