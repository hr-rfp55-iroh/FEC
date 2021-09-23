import React, { useState } from 'react';

const UploadPhotoAnswer = (props) => {
  const [image, setImage] = useState({ preview: [], raw: [] });
  const [imageCount, setImageCount] = useState(0);
  const [isAnyUploaded, setIsAnyUploaded] = useState(false);
  const handleFileUpload = (e) => {
    console.log(e)
    setImageCount(imageCount + e.target.files.length);
    if (e.target.files.length) {
      setImage(image.preview.concat(e.target.files));
    }
    // if (e.target.files.length) {
    //   setImage({
    //     preview: URL.createObjectURL(e.target.files[0]),
    //     raw: e.target.files[0],
    //   });
  };
  const handleCancelUpload = () => {
    //set image count to 0
    // set image.preview to []
  };

  return (
    <div>
      <div>
        Upload Your photos <br />
        <input type="file" accept=".png, .jpg, .jpeg" multiple onChange={(e) => handleFileUpload(e)} />
        <div>

          {isAnyUploaded && image.map((img) => {
            return (
              // console.log(URL.createObjectURL(img));
              < img src={URL.createObjectURL(img)} height="100" />
            )
          })}
          {/* {console.log(URL.createObjectURL(files))} */}
        </div>
      </div>
    </div >);
}

export default UploadPhotoAnswer;
