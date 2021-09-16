import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const QuestionModal = (props) => {
  const { currentProduct } = props;
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const toggleModal = () => {
    setModal(!modal);
  };
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
        .then(() => { setText(''); setEmail(''); setNickname(''); })
        .catch(() => customAlert('Question could not be posted.'));
    }
  };

  return (
    <div>
      <button className="button-modal" onClick={toggleModal} type="submit">Submit A Question</button>
      {modal && (
        <div className="modal">
          <div className="overlay" role="button" tabIndex="0">
            <div className="modal-content">

              <h2>
                Your Question:
              </h2>
              <div>What is your question? (required)</div>
              <form>
                <div>
                  <span className="submit-question-error">{errors.question}</span>
                </div>
                <br />

                <textarea name="submitQuestion" maxLength="1000" value={text} onChange={(e) => setText(e.target.value)} placeholder="Why did you like the product or not?" required />
                <br />
                <div> What is your nickname? (required) </div>
                <div>
                  <span className="submit-question-error">{errors.nickname}</span>
                </div>
                <br />
                <textarea name="submitQuestion" maxLength="60" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="jackson11!" required />
                <div>What is your email? (required)</div>
                <div>
                  <span className="submit-question-error">{errors.email}</span>
                </div>
                <br />
                <textarea name="submitQuestion" maxLength="60" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email here" required />

              </form>
            </div>

            <button className="submit-button" type="submit" onClick={handleValidationAndSubmit}>Submit Form</button>
            <button className="close-modal" type="submit" onClick={toggleModal}>Close The Modal </button>
          </div>
        </div>
      )}
    </div>
  );
};

QuestionModal.propTypes = {
  currentProduct: PropTypes.number,
};

QuestionModal.defaultProps = {
  currentProduct: 30344,
};

export default QuestionModal;
