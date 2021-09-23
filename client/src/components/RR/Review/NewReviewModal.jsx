import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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
  // Elements in form
  const [overallRating, setOverallRating] = useState(0);
  const [isRecommended, setIsRecommended] = useState(null);
  // Elements in product experience section
  const [sizeRating, setSizeRating] = useState(0);
  const [widthRating, setWidthRating] = useState(0);
  const [comfortRating, setComfortRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [lengthRating, setLengthRating] = useState(0);
  const [fitRating, setFitRating] = useState(0);
  // Elements in form
  const [reviewSum, setReviewSum] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [photoUrls, setPhotoUrls] = useState([]);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  // characteristics rating for current product
  const { characteristics } = props;
  const charcs = Object.keys(characteristics);
  const charcsInfo = {};

  // Open/Close Modal
  const toggleModal = () => {
    setProductName(document.getElementById('product-name').innerHTML);
    setModal(!modal);
  };

  const validateForm = () => {
    // Create a variable to store all ratings for all characteristics
    const prodExp = {
      Size: sizeRating,
      Width: widthRating,
      Comfort: comfortRating,
      Quality: qualityRating,
      Length: lengthRating,
      Fit: fitRating,
    };
    // Construct the characteristics object to pass into the POST request to API
    charcs.forEach((charc) => {
      const key = characteristics[charc].id;
      const value = prodExp[charc];
      charcsInfo[key] = value;
    });
    // Create a list of missing fields to be included in the alert message
    let missingItems = '';
    if (!overallRating) {
      missingItems += '- Overall Rating\n';
    }
    if (isRecommended === null) {
      missingItems += '- Do you recommend this product?\n';
    }
    for (let i = 0; i < charcs.length; i += 1) {
      if (!prodExp[charcs[i]]) {
        missingItems += `- ${charcs[i]} Rating\n`;
      }
    }
    if (!reviewBody) {
      missingItems += '- Review Body\n';
    } else if (reviewBody.length < 50) {
      missingItems += '- Review Body: Minimum 50 characters\n';
    }
    if (!nickname) {
      missingItems += '- Your nickname\n';
    }
    if (!email) {
      missingItems += '- Your email';
    } else if (email.indexOf('@') === -1) {
      missingItems += '- Your email: Incorrect email format';
    }
    return missingItems;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingItems = validateForm();
    if (!missingItems) {
      const { selected } = props;
      axios.post('/reviews', {
        product_id: selected,
        rating: overallRating,
        summary: reviewSum,
        body: reviewBody,
        recommend: isRecommended,
        name: nickname,
        email,
        photos: photoUrls,
        characteristics: charcsInfo,
      })
        .then(() => {
          console.log('Review posted!');
          const { updateRatingReview } = props;
          toggleModal();
          updateRatingReview();
        })
        .catch((err) => {
          console.log('Error posting review to API: ', err);
        });
    } else {
      alert(`You must enter the following:\n${missingItems}`);
    }
  };

  return (
    <div>
      <button id="add-review-btn" className="review-list-btn" onClick={toggleModal} type="button">SUBMIT A REVIEW</button>
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
              <div className="review-form-rating">
                <p>Overall Rating*</p>
                <ReviewStarRating name="overall" selections={starSelections} handleChange={(num) => { setOverallRating(Number(num)); }} />
                <p>Do you recommend this product?*</p>
                <label htmlFor="recommend-yes">
                  <input type="radio" id="recommend-yes" name="recommend" value="yes" onChange={() => { setIsRecommended(true); }} />
                  Yes
                </label>
                <label htmlFor="recommend-no">
                  <input type="radio" id="recommend-no" name="recommend" value="no" onChange={() => { setIsRecommended(false); }} />
                  No
                </label>
                <br />
                <p>Product Experience*</p>
                <div>
                  {charcs.map((charc) => (
                    <ReviewCharacteristics
                      charc={charc}
                      name={charc}
                      handleChange={(num, name) => {
                        if (name === 'Size') {
                          setSizeRating(Number(num));
                        } else if (name === 'Width') {
                          setWidthRating(Number(num));
                        } else if (name === 'Comfort') {
                          setComfortRating(Number(num));
                        } else if (name === 'Quality') {
                          setQualityRating(Number(num));
                        } else if (name === 'Length') {
                          setLengthRating(Number(num));
                        } else {
                          setFitRating(Number(num));
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="review-form-text">
                <p>Review Summary</p>
                <textarea maxLength="60" placeholder="Example: Best purchase ever!" onChange={(e) => { setReviewSum(e.target.value); }} />
                <p>Review Body*</p>
                <textarea
                  maxLength="1000"
                  placeholder="Why did you like the product or not?"
                  onChange={(e) => {
                    setCharCount(e.target.value.length);
                    setReviewBody(e.target.value);
                  }}
                  id="form-review-body-text"
                />
                {charCount < 50 ? (
                  <p className="form-note">
                    Minimum required characters left:
                    &nbsp;
                    {50 - charCount}
                  </p>
                ) : (
                  <p className="form-note">
                    Minimum reached
                  </p>
                )}
                <PhotoUpload handlePhotoUpload={(files) => {
                  const urls = files.map((photo) => URL.createObjectURL(photo));
                  setPhotoUrls(urls);
                }}
                />
                <p>Your nickname*</p>
                <input type="text" name="new-review-nickname" id="new-review-nickname" maxLength="60" placeholder="Example:jackson11!" onChange={(e) => { setNickname(e.target.value); }} />
                <p className="form-note">
                  For privacy reasons, do not use your full name or email address
                </p>
                <p>Your Email*</p>
                <input name="new-review-email" id="new-review-email" maxLength="60" placeholder="Example:jackson11@email.com" onChange={(e) => { setEmail(e.target.value); }} />
                <p className="form-note">
                  For authentication reasons, you will not be emailed
                </p>
              </div>
            </form>
          </div>
          <div role="presentation" id="form-close-btn" onClick={toggleModal}>
            <img src="./static/close.svg" height="20px" alt="right-arrow" />
          </div>
          <button id="form-submit-btn" type="submit" form="create-review">Submit</button>
        </div>
      )}
    </div>
  );
};

CreateReviewModal.propTypes = {
  selected: PropTypes.number,
  characteristics: PropTypes.objectOf(PropTypes.any),
  updateRatingReview: PropTypes.func,
};

CreateReviewModal.defaultProps = {
  selected: 0,
  characteristics: {},
  updateRatingReview: () => {},
};

export default CreateReviewModal;

// console.log('overall:', overallRating);
// console.log('recommend', isRecommended);
// console.log('size:', sizeRating);
// console.log('width:', widthRating);
// console.log('comfort:', comfortRating);
// console.log('quality:', qualityRating);
// console.log('length:', lengthRating);
// console.log('fit:', fitRating);
// console.log('summary:', reviewSum);
// console.log('body:', reviewBody);
// console.log('nickname:', nickname);
// console.log('email:', email);
