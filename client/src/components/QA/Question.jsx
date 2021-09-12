import React from 'react';

const Question = (props) => {
  // const convertDate = (date) => {
  // return new Date(date);
  // };
  const { isQuestionsLoaded, allQuestions } = props;
  return (
    <div>
      {isQuestionsLoaded ? allQuestions.results.map((q) => (
        <div key={q.question_id}>
          {q.asker_name}
          {' '}
          asks:
          {q.question_body}
          {'  '}
          on
          {q.question_date}
        </div>
      )) : ''}
    </div>
  );
};

export default Question;
