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
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  // characteristics rating for current product
  const { characteristics } = props;
  const charcs = Object.keys(characteristics);

  const validateForm = () => {
    const prodExp = {
      Size: sizeRating,
      Width: widthRating,
      Comfort: comfortRating,
      Quality: qualityRating,
      Length: lengthRating,
      Fit: fitRating,
    };
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

  const toggleModal = () => {
    setProductName(document.getElementById('product-name').innerHTML);
    setModal(!modal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingItems = validateForm();
    if (!missingItems) {
      console.log('Ready to post review!');
      // const { selected } = props;
      // axios.post('/reviews', {
      //   data: {
      //     product_id: selected,
      //     rating: overallRating,
      //     summary: reviewSum,
      //     body: reviewBody,
      //     recommend: isRecommended,
      //     name: nickname,
      //     email,
      //     // photos
      //     // characteristics
      //   },
      // })
      //   .then(() => {
      //     console.log('Review posted!');
      //     toggleModal();
      //   })
      //   .catch((err) => {
      //     console.log('Error posting review to API: ', err);
      //   });
    } else {
      alert(`You must enter the following:\n${missingItems}`);
    }
  };

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
              <ReviewStarRating name="overall" selections={starSelections} handleChange={(num) => { setOverallRating(num); }} />
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
                        setSizeRating(num);
                      } else if (name === 'Width') {
                        setWidthRating(num);
                      } else if (name === 'Comfort') {
                        setComfortRating(num);
                      } else if (name === 'Quality') {
                        setQualityRating(num);
                      } else if (name === 'Length') {
                        setLengthRating(num);
                      } else {
                        setFitRating(num);
                      }
                    }}
                  />
                ))}
              </div>
              <br />
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
              />
              {charCount < 50 ? (
                <p className="review-form-note">
                  Minimum required characters left:
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
              <p>Your nickname*</p>
              <input type="text" name="new-review-nickname" id="new-review-nickname" maxLength="60" placeholder="Example:jackson11!" onChange={(e) => { setNickname(e.target.value); }} />
              <p className="review-form-note">
                For privacy reasons, do not use your full name or email address
              </p>
              <br />
              <p>Your Email*</p>
              <input name="new-review-email" id="new-review-email" maxLength="60" placeholder="Example:jackson11@email.com" onChange={(e) => { setEmail(e.target.value); }} />
              <p className="review-form-note">
                For authentication reasons, you will not be emailed
              </p>
            </form>
          </div>
          <button className="review-form-close-btn" type="button" onClick={toggleModal}>x</button>
          <button className="review-form-submit-btn" type="submit" form="create-review">Submit</button>
        </div>
      )}
    </div>
  );
};

CreateReviewModal.propTypes = {
  characteristics: PropTypes.objectOf(PropTypes.any),
  selected: PropTypes.number,
};

CreateReviewModal.defaultProps = {
  characteristics: {},
  selected: 40344,
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
