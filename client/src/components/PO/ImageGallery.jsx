/* eslint-disable react/forbid-prop-types */
import React, { useState, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const Image = lazy(() => import('./Image'));

const ImageGallery = (props) => {
  const { photos, photoIndex, setPhotoIndex } = props;
  const [modal, setModal] = useState(false);

  const mappedPhotos = photos.map((photo, index) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Image
        key={index.toString()}
        index={index}
        thumb={photo.thumbnail_url}
        setPhotoIndex={setPhotoIndex}
      />
    </Suspense>
  ));

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    < >
      {modal && (
        <div className="modal">
          <div
            onClick={toggleModal}
            onKeyPress={toggleModal}
            className="overlay"
            role="button"
            tabIndex={0}
          >
            <div className="modal-content-img">
              <img
                alt="style"
                src={photos[photoIndex].url}
              />
            </div>
          </div>
        </div>
      )}
      {(() => {
        if (photos.length !== 0) {
          if (!photos[photoIndex].url) { return ('no photos available'); }
          return (
            < >
              <div id="image-selector">
                {mappedPhotos}
              </div>
              <div
                id="main-image"
                role="button"
                onClick={toggleModal}
                tabIndex={0}
                onKeyPress={toggleModal}
              >
                <img
                  alt="style"
                  src={photos[photoIndex].url}
                />
              </div>
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
  photoIndex: PropTypes.number,
  setPhotoIndex: PropTypes.func,
};

ImageGallery.defaultProps = {
  photos: [],
  photoIndex: 0,
  setPhotoIndex: null,
};

export default ImageGallery;
