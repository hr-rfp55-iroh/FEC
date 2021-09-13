import React, { useState } from 'react';

const Modal = (props) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button className="button-modal" onClick={toggleModal} type="submit">Hello Modal! (Open) </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} onKeyPress={toggleModal} className="overlay" role="button" tabIndex="0">
            <div className="modal-content">

              <h2>
                Content Title
              </h2>
              <p>
                Content
              </p>
            </div>
            <button className="close-modal" type="submit" onClick={toggleModal}>Close The Modal </button>
          </div>
        </div>
      )}
      {/* <p>hello from down here</p> */}
    </div>
  );
};

export default Modal;
