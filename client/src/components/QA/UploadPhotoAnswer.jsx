import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UploadPhotoAnswer = (props) => {
  const { preparePhotos } = props;
  const [image, setImage] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const handleFileUpload = (e) => {
    setImageCount(imageCount + e.target.files.length);
    if (e.target.files.length) {
      const newDisplay = image.slice().concat(Object.values(e.target.files));
      setImage(newDisplay);
      preparePhotos(newDisplay);
    }
  };
  const handleCancelUpload = (e) => {
    e.preventDefault();
    setImage([]);
    setImageCount(0);
    preparePhotos([]);
  };

  return (
    <div>
      <div>
        <div className="photo-upload">
          <label htmlFor="new-answer-photo">
            Upload your photos : Maximum 5 photos
            {
              imageCount < 5
              && (
                <input id="new-answer-photo-label" name="Upload your photos" type="file" accept=".png, .jpg, .jpeg" multiple onChange={(e) => handleFileUpload(e)} />
              )
            }
          </label>

        </div>
        <div className="photo-upload">
          {image.map((img) => (
            <>
              <img src={URL.createObjectURL(img)} value={URL.createObjectURL(img)} height="100" alt="" />
            </>
          ))}
          <button id="cancel-upload-btn" type="button" onClick={(e) => handleCancelUpload(e)}>Clear Photos</button>
        </div>

      </div>
    </div>
  );
};

UploadPhotoAnswer.propTypes = {
  preparePhotos: PropTypes.func,

};

UploadPhotoAnswer.defaultProps = {
  preparePhotos: () => { },
};

export default UploadPhotoAnswer;
