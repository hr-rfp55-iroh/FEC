/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

const ImageGallery = (props) => {
  const { photos, photoIndex, setPhotoIndex } = props;

  const mappedPhotos = photos.map((photo, index) => (
    <Image
      key={index.toString()}
      index={index}
      thumb={photo.thumbnail_url}
      setPhotoIndex={setPhotoIndex}
    />
  ));

  return (
    < >
      {(() => {
        if (photos.length !== 0) {
          if (!photos[photoIndex].url) { return ('no photos available'); }
          return (
            < >
              <div id="image-selector">
                {mappedPhotos}
              </div>
              <img
                alt="style"
                src={photos[photoIndex].url}
              />
            </>
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
