import React, { useState } from 'react';

const Modal = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    console.log('hello the set state works');
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} type="submit">Hello </button>
      {modal && (
        <div>
          <div>
            <h2>
              Hello Modal!
            </h2>
            <p>
              CONTENT!
            </p>
            <button name="close" type="submit" onClick={toggleModal}>Close </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
