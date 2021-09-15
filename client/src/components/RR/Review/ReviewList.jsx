import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReviewTile from './ReviewTile';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.handleMoreReviewsClick = this.handleMoreReviewsClick.bind(this);
    this.handleSortSelection = this.handleSortSelection.bind(this);
    this.state = {
      reviews: [],
      count: 2,
    };
  }

  componentDidMount() {
    const { sortOption } = this.props;
    this.getReviews(sortOption);
  }

  handleMoreReviewsClick() {
    let { count } = this.state;
    this.setState({
      count: count += 2,
    });
  }

  handleSortSelection(e) {
    const { handleSortSelection } = this.props;
    this.getReviews(e.target.value);
    handleSortSelection(e.target.value);
  }

  getReviews(sortOption) {
    const { selected } = this.props;
    axios.get('/reviews/', { params: { product_id: selected, sort: sortOption } })
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
            <select name="sort-options" id="sort-options" onChange={this.handleSortSelection}>
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
  handleSortSelection: PropTypes.func,
  sortOption: PropTypes.string,
  selected: PropTypes.number,
  filter: PropTypes.arrayOf(PropTypes.number),
};

ReviewList.defaultProps = {
  handleSortSelection: () => {},
  sortOption: 'relevant',
  selected: 40344,
  filter: [1, 2, 3, 4, 5],
};

export default ReviewList;
