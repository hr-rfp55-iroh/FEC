import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReviewPhoto from './ReviewPhoto';
import Star from '../Rating/Star';

const reformatDateString = (string) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octover', 'November', 'December'];
  const index = Number(string.slice(5, 7)) - 1;
  return `${months[index]} ${Number(string.slice(8, 10))}, ${string.slice(0, 4)}`;
};

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.handleHelpfulClick = this.handleHelpfulClick.bind(this);
    this.handleReportClick = this.handleReportClick.bind(this);
    this.state = {

    };
  }

  handleHelpfulClick(e) {
    const review_id = e.target.value;
    const { updateReviewList } = this.props;
    axios.put(`/reviews/${review_id}/helpful`)
      .then(() => {
        updateReviewList();
      })
      .catch((err) => {
        console.log('Error sending PUT request to update helpfulness rating: ', err);
      });
  }

  handleReportClick(e) {
    const review_id = e.target.value;
    const { updateReviewList } = this.props;
    axios.put(`/reviews/${review_id}/report`)
      .then(() => {
        updateReviewList();
      })
      .catch((err) => {
        console.log('Error sending PUT request to report review: ', err);
      });
  }

  render() {
    const { review } = this.props;
    const {
      review_id,
      rating,
      reviewer_name,
      date,
      summary,
      body,
      photos,
      recommend,
      response,
      helpfulness,
    } = review;
    // const testRating = 2.125;
    return (
      <li className="review-tile">
        <div>
          <div className="review-header">
            <Star rating={rating} />
            {/* <Star rating={testRating} /> */}
            <div>
              {reformatDateString(date.slice(0, 10))}
            </div>
          </div>
          <div className="review-summary">{summary}</div>
        </div>
        <div>
          <div style={{ margin: '10px 0px' }}>{body}</div>
          {photos.length > 0
          && (
          <div className="photo-list">
            {photos.map((photo) => (
              <ReviewPhoto photo={photo} />
            ))}
          </div>
          )}
          {recommend
          && (
            <div style={{ margin: '10px 0px' }}>&#10003; I recommend this product</div>
          )}
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            {reviewer_name}
          </div>
          {response
          && (
            <div className="review-response">
              <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Response from seller:</div>
              {response}
            </div>
          )}
        </div>
        <div className="review-footer">
          <div>Was this review helpful?</div>
          &nbsp;
          <button type="button" id="helpful-btn" value={review_id} onClick={this.handleHelpfulClick}>Yes</button>
          <div className="review-footer-text">
            &#40;
            {helpfulness}
            &#41;&nbsp;&nbsp;&#124;&nbsp;
          </div>
          <button type="button" id="report-btn" value={review_id} onClick={this.handleReportClick}>Report</button>
        </div>
      </li>
    );
  }
}

ReviewTile.propTypes = {
  review: PropTypes.objectOf(PropTypes.any),
  updateReviewList: PropTypes.func,
};

ReviewTile.defaultProps = {
  review: {
    rating: 0,
    reviewer_name: 'default',
    date: 'default',
    summary: 'default',
    body: 'default',
    photos: [],
    recommend: false,
    response: 'default',
    helpfulness: 0,
  },
  updateReviewList: () => {},
};

export default ReviewTile;
