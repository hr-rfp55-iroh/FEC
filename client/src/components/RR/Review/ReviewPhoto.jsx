import React from 'react';
import PropTypes from 'prop-types';

const ReviewPhoto = (props) => {
  const { id, url } = props;
  return (
    <div>
      Image
      {id}
      {url}
    </div>
  );
};

ReviewPhoto.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
};

ReviewPhoto.defaultProps = {
  id: 1,
  url: 'default',
};

export default ReviewPhoto;
