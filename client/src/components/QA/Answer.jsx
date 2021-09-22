import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'moment';

const Answer = ({ answer, getQuestions }) => {
  const {
    answerer_name, body, date, helpfulness, photos, id
  } = answer;
  const [reported, setReported] = useState(false);
  const [isLimitHelpful, setIsLimitHelpful] = useState(false);
  const [helpfulTrigger, setHelpfulTrigger] = useState(helpfulness);
  const ansObj = { answer_id: id };
  const photoAlias = photos;
  const handleReportAnswer = (e) => {
    e.preventDefault();
    axios.put('/qa/answers/report', ansObj);
    // .then(() => )
    // .catch((error) => console.log(error));
  };
  const handleHelpfulAnswer = (e) => {
    e.preventDefault();
    axios.put('/qa/answers/helpful', ansObj)
      .then(() => setHelpfulTrigger(helpfulTrigger + 1))
      .then(() => setIsLimitHelpful(true))
      .then(() => getQuestions())
      .catch((err) => console.log(err));
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
        {photoAlias.map((photo) => (<div key={photo.toString()}><img alt="" src={photo} id="answer-images" /></div>))}
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
};

Answer.defaultProps = {
  answer: '',
  answerer_name: '',
  body: '',
  date: '',
  helpfulness: 0,
};

export default Answer;
