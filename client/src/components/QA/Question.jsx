import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ allQuestions }) => (
  <div>
    {allQuestions.results.map((q) => (
      <div key={q.question_id}>
        {q.asker_name}
        {' '}
        asks:
        {q.question_body}
        {'  '}
        on
        {q.question_date}
      </div>
    ))}
  </div>
);
// const { isQuestionsLoaded, allQuestions } = props;
// return (
//   <div>
//     {isQuestionsLoaded ? allQuestions.results.map((q) => (
//       <div key={q.question_id}>
//         {q.asker_name}
//         {' '}
//         asks:
//         {q.question_body}
//         {'  '}
//         on
//         {q.question_date}
//       </div>
//     )) : ''}
//   </div>
// );
Question.propTypes = {
  allQuestions:
    PropTypes.shape({
      question_id: PropTypes.number,
      asker_name: PropTypes.string,
      question_body: PropTypes.string,
      question_date: PropTypes.number,
    }),
};

Question.defaultProps = {
  allQuestions: '',
};

export default Question;
