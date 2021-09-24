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

  useEffect(() => {
    if (photoModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [photoModal]);

  const handleReportAnswer = (e) => {
    e.preventDefault();
    axios.put('/qa/answers/report', ansObj)
      .then(() => getQuestions());
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
      className="helpful-btn"
      tabIndex={-1}
    >
      Yes
    </span>
  );

  return (
    <div className="QA-answer">
      <div className="QA-answer-body">
        <span><strong>A: </strong></span>
        {body}
      </div>
      <div className="QA-answer-footer">
        by
        &nbsp;
        {answerer_name.toLowerCase() === 'seller' ? <strong>{answerer_name}</strong> : answerer_name}
        ,
        &nbsp;
        {Moment(date).format('MMMM DD, YYYY')}
        &nbsp;
        | Helpful?
        &nbsp;
        {!isLimitHelpful ? helpfulAnsBtn : (<span style={{ fontWeight: 'bold' }}>Yes</span>)}
        &nbsp;
        (
        {helpfulTrigger}
        ) |
        &nbsp;
        {
          !reported
            ? (
              <span
                role="button"
                type="submit"
                className="report-btn"
                onKeyDown={handleReportAnswer}
                onClick={(e) => { handleReportAnswer(e); setReported(true); }}
                tabIndex={-1}
              >
                {' '}
                Report
              </span>
            )
            : (<span style={{ fontWeight: 'bold' }}>Reported</span>)
        }
        {' '}
        {/* //TODO find a way to resize image to improve efficiency */}
      </div>
      <div>
        <div className="photo-list">
          {photoAlias.map((photo, index) => (
            <div key={`${photo}${index}`} onClick={(e) => handlePhotoPop(e.target.src)} className="photo" role="presentation">
              <img alt="" value={photo} src={photo} id="answer-images" />
            </div>
          ))}
        </div>
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
