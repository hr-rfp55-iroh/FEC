import React, { useState } from 'react';

const QuestionModal = (props) => {
  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const toggleModal = () => {
    setModal(!modal);
  };
  const handleQuestionSubmit = (e) => {
    // TODO : insert post route here that takes in obj
    e.preventDefault();
    let isFieldsFilled = true;
    const obj = { question: text, email, nickname };
    console.log(obj);
    if (text.length === 0) {
      setErrors({ question: 'fill out question' })
    }
    if (email.length === 0) {
      setErrors({ email: 'fill out email' })
    }
    if (nickname.length === 0) {
      setErrors({ nickname: 'fill out nickname' })
    }


    // let requiredFields = [`${text === '' ? 'Question' : ''}, ${email === '' ? 'Email' : ''}, ${nickname === '' ? 'Nickname' : ''}`];
    // const isFilledIn = text !== '' || email !== '' || nickname !== '';
    // if (isFilledIn) {
    //   console.log('All Fields Provided!');
    // } else {
    //   alert('Please fill in required fields: ' + requiredFields);
    // }
    // if (name.length === 0) {
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
              <form>

                <textarea name="submitQuestion" maxLength="1000" value={text} onChange={(e) => setText(e.target.value)} placeholder="Why did you like the product or not?" required />
                <br />
                <div>What is your nickname? (required)</div>
                <br />
                <textarea name="submitQuestion" maxLength="60" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jackson11!" required />
                <div>What is your email? (required)</div>
                <br />
                <textarea name="submitQuestion" maxLength="60" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Enter your email here" required />

              </form>
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
