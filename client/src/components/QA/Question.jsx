import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answer from './Answer';

const Question = ({
  question_body, question_date, asker_name, answers, question_id, question_helpfulness,
}) => {
  const sortedAnswers = Object.values(answers).sort((a, b) => b.helpfulness - a.helpfulness);
  const obj = { question_id };
  const [helpfulnessAlias, setHelpfulness] = useState(question_helpfulness);
  const handleHelpfulQuestion = (e) => {
    e.preventDefault();
    axios.put('/qa/questions/helpful', obj)
      .then(() => setHelpfulness(helpfulnessAlias + 1))
      .catch(() => alert('Cannot mark question as helpful'));
  };

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
      <span
        role="button"
        onKeyPress={handleHelpfulQuestion}
        onClick={(e) => handleHelpfulQuestion(e)}
        tabIndex={-1}
      >
        <strong>Yes</strong>
      </span>
      {' '}
      {/* {//TODO onclick toggleFn for "YES"} */}
      {' '}
      (
      {helpfulnessAlias}
      ) |
      {' '}
      <span>Add Answer</span>
      {' '}
      {/* //TODO onlick modal for "Add Answer" */}
      {' '}
      {sortedAnswers.slice(0, 2).map((answer) => <Answer answer={answer} key={answer.body} />)}
      {sortedAnswers.length > 2 ? <button type="submit">Load More Answers</button> : ''}
    </div>
  );
};

Question.propTypes = {
  question_body: PropTypes.string,
  question_date: PropTypes.string,
  asker_name: PropTypes.string,
  question_helpfulness: PropTypes.number,
  question_id: PropTypes.number,
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
  question_id: '',
};

export default Question;
