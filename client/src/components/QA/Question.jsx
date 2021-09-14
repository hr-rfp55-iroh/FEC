import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const Question = ({
  question_id, question_body, question_date, asker_name, question_helpfulness, answers,
}) => {
  const sortedAnswers = Object.values(answers).sort((a, b) => b.helpfulness - a.helpfulness);


  return (

    <div key={question_id}>
      <a><strong>Q:</strong></a>
      {question_body}
      By:
      {asker_name}
      ,
      {' '}
      {question_date}
      | Helpful?
      <a>Yes</a>
      {' '}
      {/* {//TODO onclick toggleFn for "YES"} */}
      {' '}
      (
      {question_helpfulness}
      ) |
      {' '}
      <a>Add Answer</a>
      {' '}
      {/* //TODO onlick modal for "Add Answer" */}
      {' '}
      {sortedAnswers.map((answer) => <Answer answer={answer} />)}
    </div>
  );
};

// Question.propTypes = {
//   allQuestions:
//     PropTypes.shape({
//       question_id: PropTypes.number,
//       asker_name: PropTypes.string,
//       question_body: PropTypes.string,
//       question_date: PropTypes.number,
//     }),
// };

// Question.defaultProps = {
//   allQuestions: '',
// };

export default Question;
