import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'moment';

const Answer = ({ answer, getQuestions }) => {
  const {
    answerer_name, body, date, helpfulness, photos, id,
  } = answer;
  const [reported, setReported] = useState(false);
  const [isLimitHelpful, setIsLimitHelpful] = useState(false);
  const [helpfulTrigger, setHelpfulTrigger] = useState(helpfulness);
  const [photoModal, setPhotoModal] = useState(false);
  const [photoSRC, setPhotoSRC] = useState('');
  const ansObj = { answer_id: id };
  const photoAlias = photos;
  const disableScroll = (show) => {
    console.log('hello i am disabling scroll');
    useEffect(() => {
      if (show) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }, [show]);
  };
  disableScroll(photoModal);
  const handleReportAnswer = (e) => {
    e.preventDefault();
    axios.put('/qa/answers/report', ansObj);
  };
  const handleHelpfulAnswer = (e) => {
    e.preventDefault();
    axios.put('/qa/answers/helpful', ansObj)
      .then(() => setHelpfulTrigger(helpfulTrigger + 1))
      .then(() => setIsLimitHelpful(true))
      .then(() => getQuestions());
  };
  const togglePhotoModal = () => {
    setPhotoModal(!photoModal);
  };
  const handlePhotoPop = (e) => {
    togglePhotoModal();
    setPhotoSRC(e);
  };
  const helpfulAnsBtn = (
    <span
      role="button"
      onClick={(e) => handleHelpfulAnswer(e)}
      onKeyPress={handleHelpfulAnswer}
      className="pointer"
      tabIndex={-1}
    >
      <strong>Yes</strong>
    </span>
  );

  return (
    <div>
      <span><strong>A:</strong></span>
      {body}
      <br />
      by
      {' '}
      {answerer_name.toLowerCase() === 'seller' ? <strong>{answerer_name}</strong> : answerer_name}
      ,
      {' '}
      {Moment(date).format('MMMM Do YYYY')}
      {' '}
      | Helpful?
      {!isLimitHelpful ? helpfulAnsBtn : 'Yes'}
      {' '}
      (
      {helpfulTrigger}
      ) |
      {' '}
      {
        !reported
          ? (
            <span
              role="button"
              type="submit"
              className="report"
              onKeyDown={handleReportAnswer}
              tabIndex={-1}
              onClick={(e) => { handleReportAnswer(e); setReported(true); }}
              tabIndex={-1}
            >
              {' '}
              <strong>Report</strong>
            </span>
          )
          : <span><strong> Reported</strong></span>
      }
      {' '}
      {/* //TODO find a way to resize image to improve efficiency */}
      <div>
        {photoAlias.map((photo) => (
          <>
            <div key={photo.toString()} onClick={(e) => handlePhotoPop(e.target.src)} className="photo" role="presentation">
              <img alt="" value={photo} src={photo} id="answer-images" />
            </div>
          </>
        ))}

        {photoModal && (
          <div className="overlay">
            <img src={photoSRC} alt="product-review" className="review-photo-modal" />
            <button className="review-form-close-btn" type="button" onClick={togglePhotoModal}>x</button>
          </div>
        )}
      </div>
    </div>
  );
};
Answer.propTypes = {
  answer: PropTypes.shape({
    answerer_name: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    helpfulness: PropTypes.number,
    id: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
  }),
  answerer_name: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.string,
  helpfulness: PropTypes.number,
  getQuestions: PropTypes.func,
};

Answer.defaultProps = {
  answer: '',
  answerer_name: '',
  body: '',
  date: '',
  helpfulness: 0,
  getQuestions: '',
};

export default Answer;
