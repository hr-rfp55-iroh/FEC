import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Answer = ({ answer }) => {
  const {
    answerer_name, body, date, helpfulness, photos,
  } = answer;
  const photoAlias = photos;
  const [reported, setReported] = useState(false);
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
          <button
            type="submit"
            className="helpful"
            onClick={(e) => { e.preventDefault(); setReported(true); }}
          >
            {' '}
            Report
          </button>
        )
        : <span><strong> Reported</strong></span>}
      {' '}
      {/* //TODO onclick toggle FN for report -> reported */}
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
