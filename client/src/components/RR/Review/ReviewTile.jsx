import React from 'react';
import PropTypes from 'prop-types';
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

    this.state = {

    };
  }

  render() {
    const { review } = this.props;
    const {
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
          <a style={{ color: 'grey' }} href="/">Yes</a>
          &nbsp;&#40;
          {helpfulness}
          &#41;
        </div>
      </li>
    );
  }
}

ReviewTile.propTypes = {
  review: PropTypes.objectOf(PropTypes.any),
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
};

export default ReviewTile;
