import React from 'react';
import PropTypes from 'prop-types';

const ReviewPhoto = (props) => {
  const { photo } = props;
  return (
    <div className="photo">
      <img src={photo.url} height="60" alt="product-review" />
    </div>
  );
};

ReviewPhoto.propTypes = {
  photo: PropTypes.objectOf(PropTypes.any),
};

ReviewPhoto.defaultProps = {
  photo: {
    id: 1,
    url: 'default',
  },
};

export default ReviewPhoto;
