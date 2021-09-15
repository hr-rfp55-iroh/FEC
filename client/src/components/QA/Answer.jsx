import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Answer = ({ answer }) => {
  const {
    answerer_name, body, date, helpfulness, photos, id,
  } = answer;
  const photoAlias = photos;
  const [reported, setReported] = useState(false);
  const handleReport = (e) => {
    e.preventDefault();
    console.log(e);
    axios.put('/qa/answers/report', { answer_id: id })
      .then((results) => console.log(results))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <span><strong>A:</strong></span>
      {body}
      <br />
      by
      {' '}
      {answerer_name}
      ,
      {' '}
      {date}
      {' '}
      | Helpful?
      <span>Yes</span>
      {' '}
      {/* //TODO onclick toggle FN for YES! */}
      (
      {helpfulness}
      ) |
      {' '}
      {!reported
        ? (
          <span
            role="button"
            type="submit"
            className="helpful"
            onKeyDown={handleReport}
            onClick={(e) => { handleReport(e); setReported(true); }}
            tabIndex={-1}
          >
            {' '}
            Report
          </span>
        )
        : <span><strong> Reported</strong></span>}
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
    photos: PropTypes.shape({ photo: PropTypes.string }),
  }),
  answerer_name: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.string,
  helpfulness: PropTypes.number,
  // photos: PropTypes.shape(PropTypes.string]),
};

Answer.defaultProps = {
  answer: '',
  answerer_name: '',
  body: '',
  date: '',
  helpfulness: 0,
  // photos: PropTypes.shape({ PropTypes.string }),
};

export default Answer;
