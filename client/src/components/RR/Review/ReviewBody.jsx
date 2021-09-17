import React from 'react';
import PropTypes from 'prop-types';
import ReviewPhoto from './ReviewPhoto';

class ReviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charCount: 0,
    };
  }

  render() {
    const { bodyInfo } = this.props;
    const {
      reviewer_name,
      body,
      photos,
      recommend,
      response,
    } = bodyInfo;
    return (
      <div className="review-body">
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
    );
  }
}

ReviewBody.propTypes = {
  bodyInfo: PropTypes.objectOf(PropTypes.any),
};

ReviewBody.defaultProps = {
  bodyInfo: {},
};

export default ReviewBody;
