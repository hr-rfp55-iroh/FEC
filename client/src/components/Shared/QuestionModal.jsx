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
    if (nickname.length === 0) {
      isFieldsFilled = false;
      missingFields.nickname = 'Missing nickname 📇 ';
    }
    setErrors(missingFields);

    // const requiredFields = [`${text === '' ? 'Question' : ''}, ${email === '' ? 'Email' :
    //  ''}, ${nickname === '' ? 'Nickname' : ''}`];
    const obj = { question: text, email, name: nickname, product_id: currentProduct }; // TODO need product id for post
    if (isFieldsFilled) {
      // TODO : insert post route here that takes in obj
      axios.post('url', obj) // TODO place actual endpoint in here
        .then((results) => console.log(results)) // TODO how to get results back to Q
        .then(() => console.log('Question Posted :D')) // TODO how to get results back to Q
        .catch((err) => console.log(err)); //
    }
  };

  return (
    <div>
      <button className="button-modal" onClick={toggleModal} type="submit">Submit A Question</button>
      {modal && (
        <div className="modal">
          <div className="overlay" role="button" tabIndex="0">
            {/* <div onClick={toggleModal} onKeyPress={toggleModal} */}
            {/* className="overlay" role="button" tabIndex="0"> */}
            <div className="modal-content">

              <h2>
                Your Question:
              </h2>
              <div>What is your question? (required)</div>
              <form>
                <div>
                  {errors.question}
                </div>
                <br />

                <textarea name="submitQuestion" maxLength="1000" value={text} onChange={(e) => setText(e.target.value)} placeholder="Why did you like the product or not?" required />
                <br />
                <div> What is your nickname? (required) </div>
                <div>
                  {errors.nickname}
                </div>
                <br />
                <textarea name="submitQuestion" maxLength="60" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jackson11!" required />
                <div>What is your email? (required)</div>
                <div>
                  {errors.email}
                </div>
                <br />
                <textarea name="submitQuestion" maxLength="60" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Enter your email here" required />

              </form>
            </div>

            <button className="submit-button" type="submit" onClick={handleValidationAndSubmit}>Submit Form</button>
            <button className="close-modal" type="submit" onClick={toggleModal}>Close The Modal </button>
          </div>
        </div>
      )}
      {/* <p>hello from down here</p> */}
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
