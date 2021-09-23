import React from 'react';
import PropTypes from 'prop-types';

class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      count: 0,
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(e) {
    const { handlePhotoUpload } = this.props;
    const { files, count } = this.state;
    const uploadFiles = Object.values(e.target.files);
    const newCount = count + uploadFiles.length;
    if (newCount > 5) {
      alert('You can upload maximum 5 photos.');
    } else {
      const newFiles = files.slice().concat(uploadFiles);
      handlePhotoUpload(newFiles);
      this.setState({
        files: newFiles,
        count: newCount,
      });
    }
  }

  render() {
    const { files, count } = this.state;
    return (
      <div>
        <div className="photo-upload">
          <label htmlFor="new-review-photo" id="new-review-photo-label">
            Upload your photos
            &nbsp;
            {count < 5 && <input type="file" id="new-review-photo" name="new-review-photo" accept=".png, .jpg, .jpeg" multiple onChange={this.handleFileUpload} />}
          </label>
        </div>
        <div className="photo">
          {console.log(files)}
          {files.map((photo) => (<img src={URL.createObjectURL(photo)} height="100" alt="product-review" />))}
        </div>
        <p className="review-form-note">
          Maximum 5 photos
        </p>
      </div>
    );
  }
}

PhotoUpload.propTypes = {
  handlePhotoUpload: PropTypes.func,
};

PhotoUpload.defaultProps = {
  handlePhotoUpload: () => { },
};

export default PhotoUpload;
