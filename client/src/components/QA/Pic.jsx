import React, { useState } from 'react';

const Pic = (props) => { // TODO: Pass props in :D
  const { photoSRC } = props;
  const [modal, setModal] = useState(true);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      {/* <button className="button-modal" onClick={toggleModal} type="submit">Hello Modal! (Open) </button> */}
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} onKeyPress={toggleModal} className="overlay" role="button" tabIndex="0">
            <div className="overlay" role="button" tabIndex="0">
              {/* <div id="main-image"> */}
              <img src={photoSRC} className="review-photo-modal" />
            </div>
            <button className="close-modal" type="submit" onClick={toggleModal}>Close The Modal </button>
          </div>
        </div>
      )}
      {/* <p>hello from down here</p> */}
    </div >
  );
};

export default Pic;
