import React from 'react';
import PropTypes from 'prop-types';
import ReviewPhoto from './ReviewPhoto';

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
    return (
      <li>
        <div>
          <h5>Review Tile Header:</h5>
          <div>{rating}</div>
          <div>{reviewer_name}</div>
          <div>{date.slice(0, 10)}</div>
          <div>{summary}</div>
        </div>
        <div>
          <h5>Review Tile Body:</h5>
          <div>{body}</div>
          <div>
            {photos.map((photo) => (
              <ReviewPhoto photo={photo} />
            ))}
          </div>
          <div>{recommend}</div>
          <div>{response}</div>
        </div>
        <div>
          <h5>Review Tile Footer:</h5>
          <div>{helpfulness}</div>
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
