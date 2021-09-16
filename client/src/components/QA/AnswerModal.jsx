import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// {
//   "question_id" : 329012, //id of the question
//   "body": "Who wants burgies and tacos?", //body of answer -- from form input
//   "name": "IceCube", -- from user input
//   "email": "text@gmail.com", -- from user input
//   "photos": ["https://www.gayot.com/images/reviews/amor-y-tacos.jpg", "https://media-cdn.tripadvisor.com/media/photo-p/0e/9d/e7/0c/in-n-out-2.jpg"] - from user input
// }
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
    // if (photos.length === 0) {
    //   isFieldsFilled = false;
    //   missingFields.photos = 'Missing photos! ';
    // }
    setErrors(missingFields);
    const obj = {
      body: text, email, name: nickname, question_id,
    };
    console.log(obj);
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
      <span className="button-modal" onClick={toggleModal} onKeyPress={toggleModal} type="submit"><strong>Submit An Answer</strong></span>
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
                <textarea name="submitAnswer" maxLength="60" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="jackson11!" required />
                <div>What is your email? (required)</div>
                <div>
                  <span className="submit-answer-error">{errors.email}</span>
                </div>
                <br />
                <textarea name="submitAnswer" maxLength="60" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email here" required /><br />
                <span>For authentication reasons, you will not be emailed</span>

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

// AnswerModal.propTypes = {
//   currentProduct: PropTypes.number,
// };

// AnswerModal.defaultProps = {
//   currentProduct: 30344,
// };

export default AnswerModal;
