import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import UploadPhotoAnswer from './UploadPhotoAnswer';

const AnswerModal = (props) => {
  const {
    question_id, getQuestions, question, productName,
  } = props;
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [photos, setPhotos] = useState([]);
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
  const preparePhotos = (photoUploads) => {
    const urls = photoUploads.map((photo) => URL.createObjectURL(photo));
    setPhotos(urls);
  };
  const handleValidationAndSubmit = (e) => {
    e.preventDefault();
    const missingFields = {};
    let isFieldsFilled = true;
    if (text.length === 0) {
      isFieldsFilled = false;
      missingFields.answer = 'We need your Answer 😎 ';
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
      body: text, email, name: nickname, question_id, photos,
    };
    if (isFieldsFilled) {
      axios.post('qa/answers', obj)
        .then(toggleModal())
        .then(() => { setText(''); setEmail(''); setNickname(''); })
        .then(() => getQuestions());
      // .catch(() => );
    }
  };

  return (
    <>
      <span role="button" className="submit-answer-btn" onClick={toggleModal} onKeyPress={toggleModal} type="submit" tabIndex={-1}>Submit An Answer</span>
      {modal && (
        <div className="modal">
          <div className="overlay" role="button" tabIndex="0">
            <div className="modal-content">
              <h2>
                {productName2}
                {' '}
                :
                {' '}
                {question}
              </h2>
              <div>What is your Answer? (required)</div>
              <br />
              <form>
                <div>
                  <span className="submit-answer-error">{errors.answer}</span>
                </div>
                <textarea id="answer-text" name="submitAnswer" maxLength="1000" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter yo answer here" required />
                <div> What is your nickname? (required) </div>
                <div>
                  <span className="submit-answer-error">{errors.nickname}</span>
                </div>
                <br />
                <textarea name="submitAnswer" maxLength="60" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Example: jack543!" required />
                <p className="form-note">For privacy reasons, do not use your full name or email address</p>
                <div>What is your email? (required)</div>
                <div>
                  <span className="submit-answer-error">{errors.email}</span>
                </div>
                <br />
                <textarea name="submitAnswer" maxLength="60" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email here" required />
                <p className="form-note">For authentication reasons, you will not be emailed</p>
                <UploadPhotoAnswer preparePhotos={preparePhotos} key={question_id} />
                <button id="answer-form-submit-btn" type="submit" onClick={handleValidationAndSubmit}>Submit</button>
              </form>
              <div role="presentation" id="answer-form-close-btn" onClick={toggleModal}>
                <img src="./static/close.svg" height="20px" alt="right-arrow" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AnswerModal.propTypes = {
  question_id: PropTypes.number,
  getQuestions: PropTypes.func,
  question: PropTypes.string,
  productName: PropTypes.string,

};

AnswerModal.defaultProps = {
  question_id: 0,
  getQuestions: '',
  question: '',
  productName: '',
};

export default AnswerModal;
