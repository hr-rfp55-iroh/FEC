import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Star from '../Rating/Star';
import ReviewBody from './ReviewBody';

const reformatDateString = (string) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octover', 'November', 'December'];
  const index = Number(string.slice(5, 7)) - 1;
  return `${months[index]} ${Number(string.slice(8, 10))}, ${string.slice(0, 4)}`;
};

const ReviewTile = (props) => {
  const handleHelpfulClick = (e) => {
    const review_id = e.target.value;
    const { getReviews } = props;
    axios.put(`/reviews/${review_id}/helpful`)
      .then(() => {
        getReviews();
      })
      .catch((err) => {
        console.log('Error sending PUT request to update helpfulness rating: ', err);
      });
  };

  const handleReportClick = (e) => {
    const review_id = e.target.value;
    const { getReviews } = props;
    axios.put(`/reviews/${review_id}/report`)
      .then(() => {
        getReviews();
      })
      .catch((err) => {
        console.log('Error sending PUT request to report review: ', err);
      });
  };

  const { review } = props;
  const {
    review_id, rating, reviewer_name, date, summary, body, photos, recommend, response, helpfulness,
  } = review;
  const bodyInfo = {
    reviewer_name, body, photos, recommend, response,
  };

  return (
    <li className="review-tile" data-testid="review-tile">
      <div>
        <div className="review-header">
          <Star rating={rating} />
          <div>
            {reformatDateString(date.slice(0, 10))}
          </div>
        </div>
        <div className="review-summary" data-testid="review-summary">{summary}</div>
      </div>
      <ReviewBody bodyInfo={bodyInfo} />
      <div className="review-footer">
        <div className="review-footer-text">Was this review helpful?</div>
        &nbsp;
        <button type="button" className="helpful-btn" value={review_id} onClick={handleHelpfulClick}>Yes</button>
        <div className="review-footer-text">
          &#40;
          {helpfulness}
          &#41;&nbsp;&nbsp;&#124;&nbsp;
        </div>
        <button type="button" className="report-btn" value={review_id} onClick={handleReportClick}>Report</button>
      </div>
    </li>
  );
};

ReviewTile.propTypes = {
  review: PropTypes.objectOf(PropTypes.any),
  getReviews: PropTypes.func,
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
  getReviews: () => {},
};

export default ReviewTile;
