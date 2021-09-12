import React from 'react';
import Proptypes from 'prop-types';

const Question = (props) => {
  const convertDate = (date) => {
    console.log('hello');
  }
  const { isQuestionsLoaded, allQuestions } = props;
  return (
    <div>
      {isQuestionsLoaded ? allQuestions.results.map((q) => (
        <div key={q.question_id}>
          {q.asker_name} asks: {q.question_body} on {q.question_date}
        </div>
      )) : ''}
    </div>
  );
};

export default Question;
