import React, { useState } from 'react';

const UploadPhotoAnswer = (props) => {
  const [image, setImage] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [isAnyUploaded, setIsAnyUploaded] = useState(false);
  const handleFileUpload = (e) => {
    console.log(e);
    setImageCount(imageCount + e.target.files.length);
    if (e.target.files.length) {
      // console.log('e.target.files:', e.target.files);
      // console.log('Object.values(e.target.files)', Object.values(e.target.files));
      const newFiles = image.slice().concat(Object.values(e.target.files));
      setImage(newFiles);
      // console.log('image', image);
    }
    // if (e.target.files.length) {
    //   setImage({
    //     preview: URL.createObjectURL(e.target.files[0]),
    //     raw: e.target.files[0],
    //   });
  };
  const handleCancelUpload = () => {
    // set image count to 0
    // set image.preview to []
  };

  return (
    <div>
      <div>
        Upload Your photos
        {' '}
        <br />
        <input type="file" accept=".png, .jpg, .jpeg" multiple onChange={(e) => handleFileUpload(e)} />
        <div className="photo">

          {image.map((img) => (
            // console.log(URL.createObjectURL(img));
            <img src={URL.createObjectURL(img)} height="100" />
          ))}
          {/* {console.log(URL.createObjectURL(files))} */}
        </div>
      </div>
    </div>
  );
};

export default UploadPhotoAnswer;
