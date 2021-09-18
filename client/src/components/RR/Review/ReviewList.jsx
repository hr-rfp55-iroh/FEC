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
    this.handleSortSelection = this.handleSortSelection.bind(this);
    this.updateReviewList = this.updateReviewList.bind(this);
    this.state = {
      reviews: [],
      count: 2,
      sort: 'relevant',
    };
  }

  componentDidMount() {
    const { sort } = this.state;
    this.getReviews(sort);
  }

  componentDidUpdate(prevProps) {
    const { selected } = this.props;
    const { sort } = this.state;
    if (prevProps.selected !== selected) {
      this.getReviews(sort);
    }
  }

  handleMoreReviewsClick() {
    let { count } = this.state;
    this.setState({
      count: count += 2,
    });
  }

  handleAllReviewsClick() {
    const { reviews } = this.state;
    this.setState({
      count: reviews.length,
    });
  }

  handleCollapseReviewsClick() {
    this.setState({
      count: 2,
    });
  }

  handleSortSelection(e) {
    this.setState({
      sort: e.target.value,
    });
    const { updateRatings } = this.props;
    this.getReviews(e.target.value);
    updateRatings();
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

  updateReviewList() {
    const { sort } = this.state;
    this.getReviews(sort);
  }

  render() {
    const { reviews, count } = this.state;
    const {
      filter, characteristics, selected, updateRatings,
    } = this.props;
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
              <option value="relevant" selected>Relevant</option>
              <option value="helpful">Helpful</option>
              <option value="newest">Newest</option>
            </select>
          </label>
        </div>
        {filteredReviews.length > 0
          && (
          <ul id="review-list">
            {filteredReviews.slice(0, count).map((review) => (
              <ReviewTile review={review} updateReviewList={this.updateReviewList} />
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
          selected={selected}
          updateReviewList={this.updateReviewList}
          updateRatings={updateRatings}
        />
      </div>
    );
  }
}

ReviewList.propTypes = {
  updateRatings: PropTypes.func,
  selected: PropTypes.number,
  filter: PropTypes.arrayOf(PropTypes.number),
  characteristics: PropTypes.objectOf(PropTypes.any),
};

ReviewList.defaultProps = {
  updateRatings: () => {},
  selected: 40344,
  filter: [1, 2, 3, 4, 5],
  characteristics: {},
};

export default ReviewList;
