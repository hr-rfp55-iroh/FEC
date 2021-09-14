import React from 'react';

const Answer = ({ answer }) => {
  const {
    answerer_name, body, date, helpfulness, id, photos,
  } = answer;
  return (
    <div key={id}>
      <a><strong>A:</strong></a>
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
      <a>Yes</a>
      {' '}
      {/* //TODO onclick toggle FN for YES! */}
      (
      {helpfulness}
      ) | Report
      {' '}
      {/* //TODO onclick toggle FN for report -> reported */}
      <div>
        {photos.map((photo) => (<div key={id}><img alt="" src={photo} id="answer-images" /></div>))}
      </div>
    </div>
  );
};

export default Answer;
