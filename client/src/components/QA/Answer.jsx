import React from 'react';

const Answer = ({ answer }) => {
  const {
    answerer_name, body, date, helpfulness, id, photos,
  } = answer;
  return (
    <div>
      <a><strong>A:</strong></a>
      {body}<br />
      by {answerer_name}, {date} | Helpful? Yes({helpfulness}) | Report
      <div>
        {photos.length > 0 ? 'there are photos, map me' : ''}
      </div>
    </div>
  );
};

export default Answer;
