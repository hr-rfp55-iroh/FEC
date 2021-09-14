import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const Question = ({
  question_body, question_date, asker_name, question_helpfulness, answers,
}) => {
  const sortedAnswers = Object.values(answers).sort((a, b) => b.helpfulness - a.helpfulness);
  // console.log('sorted', sortedAnswers);
  // console.log('sorted + sliced', sortedAnswers.slice(0, 2));
  // console.log('sorted + sliced to 2', sortedAnswers.slice(2));

  return (

    <div>
      <span><strong>Q:</strong></span>
      {question_body}
      By:
      {asker_name}
      ,
      {' '}
      {question_date}
      | Helpful?
      <span>Yes</span>
      {' '}
      {/* {//TODO onclick toggleFn for "YES"} */}
      {' '}
      (
      {question_helpfulness}
      ) |
      {' '}
      <span>Add Answer</span>
      {' '}
      {/* //TODO onlick modal for "Add Answer" */}
      {' '}
      {sortedAnswers.slice(0, 2).map((answer) => <Answer answer={answer} key={answer.body} />)}
    </div>
  );
};

Question.propTypes = {
  question_body: PropTypes.string,
  question_date: PropTypes.string,
  asker_name: PropTypes.string,
  question_helpfulness: PropTypes.number,
  answers: PropTypes.shape({
    answerer_name: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    helpfulness: PropTypes.number,
    id: PropTypes.number,
    photos: PropTypes.shape([PropTypes.string]),

  }),
};

Question.defaultProps = {
  question_body: '',
  question_date: '',
  asker_name: '',
  question_helpfulness: '',
  answers: '',
};

export default Question;
