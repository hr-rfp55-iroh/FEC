import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const QuestionModal = (props) => {
  const { currentProduct, getQuestions, productName } = props;
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [productName2, setProductName2] = useState('');
  const toggleModal = () => {
    setProductName2(document.getElementById('product-name').innerHTML);
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modal]);
  // regex fn to test for basic email structure "_____@__.__"
  const isEmailValid = (emailEntry) => (/\S+@\S+\.\S+/.test(emailEntry));
  const handleValidationAndSubmit = (e) => {
    e.preventDefault();
    const missingFields = {};
    let isFieldsFilled = true;
    if (text.length === 0) {
      isFieldsFilled = false;
      missingFields.question = 'We need your question 😎 ';
    }
    if (email.length === 0) {
      isFieldsFilled = false;
      missingFields.email = 'Missing email 📧 ';
    }
    if (!isEmailValid(email)) {
      isFieldsFilled = false;
      missingFields.email = 'Enter a valid email! 📧 ';
    }
    if (nickname.length === 0) {
      isFieldsFilled = false;
      missingFields.nickname = 'Missing nickname 📇 ';
    }
    setErrors(missingFields);
    const obj = {
      body: text, email, name: nickname, product_id: currentProduct,
    };
    const customAlert = (sampleText) => { alert(sampleText); };
    if (isFieldsFilled) {
      axios.post('qa/questions', obj)
        .then(toggleModal())
        .then(customAlert('Question Posted!'))
        .then(() => getQuestions())
        .then(() => { setText(''); setEmail(''); setNickname(''); })
        .catch(() => customAlert('Question could not be posted.'));
    }
  };

  return (
    <div>
      <button id="submit-question-btn" className="button-modal" onClick={toggleModal} type="submit">SUBMIT A QUESTION</button>
      {modal && (
        <div className="modal">
          <div className="overlay" role="button" tabIndex="0">
            <div className="modal-content">
              <h1>
                Ask Your Question:
              </h1>
              <h2>
                About the
                {' '}
                {productName2}
              </h2>
              <div>What is your question? (required)</div>
              <form>
                <div>
                  <span className="submit-question-error">{errors.question}</span>
                </div>
                <br />
                <textarea id="question-text" name="submitQuestion" maxLength="1000" value={text} onChange={(e) => setText(e.target.value)} placeholder="Why did you like the product or not?" required />
                <div> What is your nickname? (required) </div>
                <div>
                  <span className="submit-question-error">{errors.nickname}</span>
                </div>
                <br />
                <textarea name="submitQuestion" maxLength="60" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="jackson11!" required />
                <p className="form-note">For privacy reasons, do not use your full name or email address</p>
                <div>What is your email? (required)</div>
                <div>
                  <span className="submit-question-error">{errors.email}</span>
                </div>
                <br />
                <textarea name="submitQuestion" maxLength="60" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email here" required />
                <p className="form-note">For authentication reasons, you will not be emailed</p>
                <button id="question-form-submit-btn" type="submit" onClick={handleValidationAndSubmit}>Submit</button>
              </form>
              <div role="presentation" id="question-form-close-btn" onClick={toggleModal}>
                <img src="./static/close.svg" height="20px" alt="right-arrow" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

QuestionModal.propTypes = {
  getQuestions: PropTypes.func,
  currentProduct: PropTypes.number,
  productName: PropTypes.string,
};

QuestionModal.defaultProps = {
  getQuestions: '',
  currentProduct: 30344,
  productName: '',
};

export default QuestionModal;
