import React, { useState } from 'react';

const UploadPhotoAnswer = (props) => {
  const [image, setImage] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const handleFileUpload = (e) => {
    setImageCount(imageCount + e.target.files.length);
    if (e.target.files.length) {
      const newFiles = image.slice().concat(Object.values(e.target.files));
      setImage(newFiles);
    }
  };
  const handleCancelUpload = (e) => {
    e.preventDefault();
    setImage([]);
    setImageCount(0);
  };

  return (
    <div>
      <div>
        Upload Your photos
        {' '}
        <br />
        {imageCount < 5 && <input type="file" accept=".png, .jpg, .jpeg" multiple onChange={(e) => handleFileUpload(e)} />}
        <div className="photo-upload">
          {image.map((img) => (
            <>
              <img src={URL.createObjectURL(img)} value={URL.createObjectURL(img)} height="100" alt="" />
            </>
          ))}
          <button className="cancel-upload" type="button" onClick={(e) => handleCancelUpload(e)}>Clear Photos</button>
        </div>

      </div>
    </div>
  );
};

export default UploadPhotoAnswer;
