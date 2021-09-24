import React, { useState } from 'react';

const UploadPhotoAnswer = (props) => {
  const { preparePhotos } = props;
  const [image, setImage] = useState([]);
  const [imagesForUpload, setImagesForUpload] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const handleFileUpload = (e) => {
    console.log(e.currentTarget.files);
    setImageCount(imageCount + e.target.files.length);
    if (e.target.files.length) {
      // console.log('here', [...imagesForUpload, ...e.target.files])
      // preparePhotos([...imagesForUpload, ...e.target.files]);
      // setImagesForUpload([...imagesForUpload, e.target.files])
      // const alias = e.target.files.map((file) => { URL.createObjectURL(file); });
      // console.log('alias', alias)
      // setImagesForUpload([...images, URL.createObjectURL(e.target.files)]);
      const newDisplay = image.slice().concat(Object.values(e.target.files));
      setImage(newDisplay);
      preparePhotos(newDisplay)
      // console.log('images', imagesForUpload);
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
