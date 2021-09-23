import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'moment';
import Pic from './Pic';

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
  const togglePhotoModal = () => {
    setPhotoModal(!photoModal);
  };
  // var photo;
  const handlePhotoSrc = (e) => {
    togglePhotoModal();
    togglePhotoModal();
    setPhotoSRC(e);
  }
  const mappedPhotos2 = photoAlias.map((photo, idx) => (<div key={photo.toString()}><img alt="" src={photo} id="answer-images" onClick={togglePhotoModal} /></div>));

  return (
    <div>
      <span><strong>A:</strong></span>
      {body}
      <br />
      {photoModal && <Pic photoSRC={photoSRC} />}
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
        {photoAlias.map((photo) => (<div key={photo.toString()}><img alt="" value={photo} src={photo} id="answer-images" onClick={(e) => handlePhotoSrc(e.target.src)} /></div>))}

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
