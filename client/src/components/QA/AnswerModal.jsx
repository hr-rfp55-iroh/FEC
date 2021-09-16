import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AnswerModal = (props) => {
  const { question_id } = props;
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
    // if (photos.length === 0) { // TODO : require photo validation to be able to submit
    //   isFieldsFilled = false;
    //   missingFields.photos = 'Missing photos! ';
    // }
    setErrors(missingFields);
    const obj = {
      body: text, email, name: nickname, question_id,
    };
    console.log(obj, 'obj to submit');
    const customAlert = (sampleText) => { alert(sampleText); };
    if (isFieldsFilled) {
      axios.post('qa/answers', obj)
        .then(toggleModal())
        .then(customAlert('Answer Posted!'))
        .then(() => { setText(''); setEmail(''); setNickname(''); })
        .catch(() => customAlert('Answer could not be posted.'));
    }
  };

  return (
    <>
      <span role="button" className="pointer" onClick={toggleModal} onKeyPress={toggleModal} type="submit" tabIndex={-1}><strong>Submit An Answer</strong></span>
      {modal && (
        <div className="modal">
          <div className="overlay" role="button" tabIndex="0">
            <div className="modal-content">

              <h2>
                Your Answer:
              </h2>
              <div>What is your Answer? (required)</div>
              <form>
                <div>
                  <span className="submit-answer-error">{errors.answer}</span>
                </div>
                <br />

                <textarea name="submitAnswer" maxLength="1000" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter yo answer here" required />
                <br />
                <div> What is your nickname? (required) </div>
                <div>
                  <span className="submit-answer-error">{errors.nickname}</span>
                </div>
                <br />
                <span>For privacy reasons, do not use your full name or email address</span>
                <textarea name="submitAnswer" maxLength="60" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Example: jack543!" required />
                <div>What is your email? (required)</div>
                <div>
                  <span className="submit-answer-error">{errors.email}</span>
                </div>
                <br />
                <textarea name="submitAnswer" maxLength="60" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email here" required />
                <br />
                <span>For authentication reasons, you will not be emailed</span>
                <br />
                <br />
                <div> Upload your photos:</div>
                <br />
                <br />
                <input type="file" />
                <input type="file" />
                <input type="file" />
                <input type="file" />
                <input type="file" />
              </form>
            </div>

            <button className="submit-button" type="submit" onClick={handleValidationAndSubmit}>Submit Form</button>
            <button className="close-modal" type="submit" onClick={toggleModal}>Close The Modal </button>
          </div>
        </div>
      )}
    </>
  );
};

AnswerModal.propTypes = {
  question_id: PropTypes.number,
};

AnswerModal.defaultProps = {
  question_id: 0,
};

export default AnswerModal;
