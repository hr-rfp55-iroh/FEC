import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReviewStarRating from './ReviewStarRating';
import ReviewCharacteristics from './ReviewCharacteristics';
import PhotoUpload from './PhotoUpload';

const starSelections = {
  1: 'Poor', 2: 'Fair', 3: 'Average', 4: 'Good', 5: 'Great',
};

const CreateReviewModal = (props) => {
  const [modal, setModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [charCount, setCharCount] = useState(0);
  const toggleModal = () => {
    setProductName(document.getElementById('product-name').innerHTML);
    setModal(!modal);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    toggleModal();
  };
  const handleReviewBodyChange = (e) => {
    setCharCount(e.target.value.length);
  };
  const { characteristics } = props;
  const charcs = Object.keys(characteristics);
  return (
    <div>
      <button className="review-list-btn" onClick={toggleModal} type="button">ADD A REVIEW</button>
      {modal && (
        <div className="overlay">
          <div className="review-form-content">
            <h2>
              Write Your Review
            </h2>
            <h4>
              About the
              &nbsp;
              {productName}
            </h4>
            <form onSubmit={handleSubmit} id="create-review">
              <p>Overall Rating*</p>
              <ReviewStarRating name="overall" selections={starSelections} />
              <p>Do you recommend this product?*</p>
              <label htmlFor="recommend-yes">
                <input type="radio" id="recommend-yes" name="recommend" value="yes" required />
                Yes
              </label>
              <label htmlFor="recommend-no">
                <input type="radio" id="recommend-no" name="recommend" value="no" />
                No
              </label>
              <br />
              <p>Product Experience*</p>
              <div>
                {charcs.map((charc) => (
                  <ReviewCharacteristics charc={charc} name={charc}/>
                ))}
              </div>
              <br />
              <p>Review Summary</p>
              <textarea maxLength="60" placeholder="Example: Best purchase ever!" />
              <p>Review Body*</p>
              <textarea minLength="50" maxLength="1000" placeholder="Why did you like the product or not?" required onChange={handleReviewBodyChange} />
              {charCount < 50 ? (
                <p className="review-form-note">
                  Minimum required character left:
                  &nbsp;
                  {50 - charCount}
                </p>
              ) : (
                <p className="review-form-note">
                  Minimum reached
                </p>
              )}
              <br />
              <PhotoUpload />
              <br />
              <p>What is your nickname*</p>
              <input type="text" name="new-review-nickname" id="new-review-nickname" maxLength="60" placeholder="Example:jackson11!" required />
              <p className="review-form-note">
                For privacy reasons, do not use your full name or email address
              </p>
              <br />
              <p>Your Email*</p>
              <input type="email" name="new-review-email" id="new-review-email" maxLength="60" placeholder="Example:jackson11@email.com" required />
              <p className="review-form-note">
                For authentication reasons, you will not be emailed
              </p>
            </form>
          </div>
          <button className="review-form-close-btn" type="button" onClick={toggleModal}>x</button>
          <button className="review-form-submit-btn" type="submit" form="create-review">Submit</button>
        </div>
      )}
      {/* <p>hello from down here</p> */}
    </div>
  );
};

CreateReviewModal.propTypes = {
  characteristics: PropTypes.objectOf(PropTypes.any),
};

CreateReviewModal.defaultProps = {
  characteristics: {},
};

export default CreateReviewModal;
