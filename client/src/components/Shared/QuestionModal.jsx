import React, { useState } from 'react';

const QuestionModal = (props) => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState('');
  const toggleModal = () => {
    setModal(!modal);
  };


  return (
    <div>
      <button className="button-modal" onClick={toggleModal} type="submit">Submit A Question</button>
      {modal && (
        <div className="modal">
          <div className="overlay" role="button" tabIndex="0">
            {/* <div onClick={toggleModal} onKeyPress={toggleModal}
            className="overlay" role="button" tabIndex="0"> */}
            <div className="modal-content">

              <h2>
                Your Question:
              </h2>
              <textarea maxLength="1000" value={text} onChange={(e) => setText(e.target.value)} />
              <p>
                Content
              </p>
            </div>

            <button className="submit-question" type="submit">Submit Form</button>
            <button className="close-modal" type="submit" onClick={toggleModal}>Close The Modal </button>
          </div>
        </div>
      )}
      {/* <p>hello from down here</p> */}
    </div>
  );
};

export default QuestionModal;
