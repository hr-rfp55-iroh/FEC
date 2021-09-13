import React, { useState } from 'react';

const QuestionModal = (props) => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const toggleModal = () => {
    setModal(!modal);
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
              <textarea maxLength="1000" value={text} onChange={(e) => setText(e.target.value)} placeholder="Why did you like the product or not?" />
              <br />
              <div>What is your email? (required)</div>
              <br />
              <textarea maxLength="60" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jackson11!" />
            </div>

            <button className="submit-button" type="submit">Submit Form</button>
            <button className="close-modal" type="submit" onClick={toggleModal}>Close The Modal </button>
          </div>
        </div>
      )}
      {/* <p>hello from down here</p> */}
    </div>
  );
};

export default QuestionModal;
