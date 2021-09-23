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
        {!isLimitHelpful ? helpfulAnsBtn : 'Yes'}
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
            : <span><strong> Reported</strong></span>
        }
        {' '}
        {/* //TODO find a way to resize image to improve efficiency */}
      </div>
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
