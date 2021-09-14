import React from 'react';

const Answer = ({ answer }) => {
  const {
    answer_name, body, date, helpfulness, id, photos,
  } = answer;
  return (
    <div>
      <a><strong>A:</strong></a>
      {body}
    </div>
  );
};

export default Answer;
