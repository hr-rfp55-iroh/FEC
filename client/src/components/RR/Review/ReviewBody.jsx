import React from 'react';
import PropTypes from 'prop-types';
import ReviewPhoto from './ReviewPhoto';

class ReviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showAll: false,
    };
    this.handleShowCollapseClick = this.handleShowCollapseClick.bind(this);
  }

  handleShowCollapseClick() {
    const { showAll } = this.state;
    const { bodyInfo } = this.props;
    const {
      body,
    } = bodyInfo;
    console.log('CLicked', body.length);
    this.setState({
      showAll: !showAll,
    });
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
    const { showAll } = this.state;
    return (
      <div className="review-body">
        { showAll && (
        <div id="review-body-text">
          <p>
            {body}
            &nbsp;
            <button type="button" id="collapse-body-btn" onClick={this.handleShowCollapseClick}>Show less</button>
          </p>
        </div>
        )}
        {!showAll && body.length > 250 && (
          <div id="review-body-text">
            <p>
              {body.slice(0, 250)}
              ...
              <button type="button" id="show-more-btn" onClick={this.handleShowCollapseClick}>Show more</button>
            </p>
          </div>
        )}
        {!showAll && body.length <= 250 && <p id="review-body-text">{body}</p>}
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
