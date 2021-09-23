import React, { useState } from 'react';

const UploadPhotoAnswer = (props) => {
  const [image, setImage] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [isModalDisplayed, setModalDisplay] = useState(false);
  const [source, setSource] = useState('');
  const handleFileUpload = (e) => {
    console.log(e);
    setImageCount(imageCount + e.target.files.length);
    if (e.target.files.length) {
      // e.target.files.forEach((file, idx) => { console.log(file) });
      // console.log(Object.values(e.target.files));
      // const alias = Object.values(e.target.files);
      // alias.forEach((file, idx) => { console.log(file.lastModified) });
      const newFiles = image.slice().concat(Object.values(e.target.files));
      setImage(newFiles);
    }
  };
  const handleCancelUpload = (e) => {
    e.preventDefault();
    setImage([]);
    setImageCount(0);
  };
  const handleModal = (e) => {
    console.log('e.target.value', e.target.value);
    // console.log('URL.createObjectURL(e.target.src)', URL.createObjectURL(e.target.src));
    // console.log('image', image)
    // console.log('image', image)
    const alias = Object.values(e.target.files);
    console.log(alias)
    alias.forEach((file, idx) => { console.log(file.lastModified) });
    setSource(e.target.src);
  };
  const toggleModal = () => {
    setModalDisplay(!isModalDisplayed);
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
              {/* {console.log(img)}
              {console.log(URL.createObjectURL(img))} */}
              <img src={URL.createObjectURL(img)} value={URL.createObjectURL(img)} height="100" alt="" onClick={(e) => handleModal(e)} />
            </>
          ))}
          <button className="cancel-upload" type="button" onClick={(e) => handleCancelUpload(e)}>Clear Photos</button>
        </div>
        {isModalDisplayed && (
          <div className="overlay">
            <img src={URL.createObjectURL(source)} alt="product-review" className="review-photo-modal" />
            {/* <button className="review-form-close-btn" type="button" onClick={togglePhotoModal}>x</button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPhotoAnswer;
