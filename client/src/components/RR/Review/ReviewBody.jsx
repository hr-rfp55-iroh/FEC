import React from 'react';
import PropTypes from 'prop-types';

import { QuestionHeader } from '../../GlobalStyle';

class ReviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showAll: false,
      displayUrl: '',
    };
    this.handleShowCollapseClick = this.handleShowCollapseClick.bind(this);
    this.togglePhotoModal = this.togglePhotoModal.bind(this);
  }

  handleShowCollapseClick() {
    const { showAll } = this.state;
    this.setState({
      showAll: !showAll,
    });
  }

  togglePhotoModal(e) {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
      displayUrl: e.target.getAttribute('src'),
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
    const { showAll, modal, displayUrl } = this.state;
    return (
      <div>
        { showAll && (
        <div className="review-body-text">
          <p>
            {body}
            &nbsp;
            <button type="button" className="collapse-body-btn" onClick={this.handleShowCollapseClick}>Show less</button>
          </p>
        </div>
        )}
        {!showAll && body.length > 250 && (
          <div className="review-body-text">
            <p>
              {body.slice(0, 250)}
              ...
              <button type="button" className="show-more-btn" onClick={this.handleShowCollapseClick}>Show more</button>
            </p>
          </div>
        )}
        {!showAll && body.length <= 250 && <p className="review-body-text">{body}</p>}
        {photos.length > 0
        && (
        <div className="photo-list">
          {photos.map((photo) => (
            <div className="photo" onClick={this.togglePhotoModal} onKeyPress={this.togglePhotoModal} role="presentation">
              <img src={photo.url} height="60" alt="product-review" value={photo.url} />
            </div>
          ))}
        </div>
        )}
        {modal && (
        <div className="overlay">
          <img src={displayUrl} alt="product-review" className="review-photo-modal" />
          <button className="review-form-close-btn" type="button" onClick={this.togglePhotoModal}>x</button>
        </div>
        )}
        {recommend
        && (
          <div style={{ margin: '10px 0px', fontWeight: 'normal' }}>&#10003; I recommend this product</div>
        )}
        <br />
        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          {reviewer_name}
        </div>
        {response
        && (
          <QuestionHeader>
            <div className="review-response">
              <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Response from seller:</div>
              {response}
            </div>
          </QuestionHeader>
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
