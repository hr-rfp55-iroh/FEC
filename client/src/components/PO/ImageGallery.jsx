/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageGallery = (props) => {
  const { photos } = props;
  const [photoIndex, setPhotoIndex] = useState(0);

  console.log('STYLE PHOTOS!', photos);

  return (
    <>
      {(() => {
        if (photos.length !== 0) {
          return (
            <img
              alt="style"
              src={photos[0].url}
            />
          );
        }
        return ('');
      })()}
    </>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array,
};

ImageGallery.defaultProps = {
  photos: [],
};

export default ImageGallery;
