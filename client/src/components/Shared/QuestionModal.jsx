import React, { useState } from 'react';

const QuestionModal = (props) => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const toggleModal = () => {
    setModal(!modal);
  };
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    // const obj = { question: text, email: email, nickname: nickname };
    const obj = { question: text, email, nickname };
    // insert post route here:
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
              <br />
              <textarea name="submitQuestion" maxLength="1000" value={text} onChange={(e) => setText(e.target.value)} placeholder="Why did you like the product or not?" required />
              <br />
              <div>What is your nickname? (required)</div>
              <br />
              <textarea name="submitQuestion" maxLength="60" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jackson11!" required />
              <div>What is your email? (required)</div>
              <br />
              <textarea name="submitQuestion" maxLength="60" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Enter your email here" required />
            </div>

            <button className="submit-button" type="submit" onClick={handleQuestionSubmit}>Submit Form</button>
            <button className="close-modal" type="submit" onClick={toggleModal}>Close The Modal </button>
          </div>
        </div>
      )}
      {/* <p>hello from down here</p> */}
    </div>
  );
};

export default QuestionModal;
