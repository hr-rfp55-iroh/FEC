import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'moment';
import Answer from './Answer';
import AnswerModal from './AnswerModal';

const Question = ({
  question_body, question_date, asker_name,
  answers, question_id, question_helpfulness, getQuestions,
}) => {
  const [helpfulnessAlias, setHelpfulness] = useState(question_helpfulness);
  const [count, setCount] = useState(2);
  const [button, setButton] = useState('');
  const [isLimitHelpful, setIsLimitHelpful] = useState(false);
  const obj = { question_id };
  const sortedAnswers = Object.values(answers).sort((a, b) => b.helpfulness - a.helpfulness);
  sortedAnswers.sort((a, b) => {
    if (a.answerer_name === 'Seller' && b.answerer_name !== 'Seller') {
      return -1;
    }
    return 0;
  });

  const handleHelpfulQuestion = (e) => {
    e.preventDefault();
    axios.put('/qa/questions/helpful', obj)
      .then(() => setHelpfulness(helpfulnessAlias + 1))
      .then(() => setIsLimitHelpful(true));
  };
  const handleCollapseAnswers = () => {
    setCount(2);
  };
  const handleLoadMoreAnswers = () => {
    const collpaseAnswersBtn = (<button className="load-answer" onClick={handleCollapseAnswers} type="submit">Collapse Answers</button>);
    setCount(count + 2);
    if (sortedAnswers.length > count) {
      setButton(collpaseAnswersBtn);
    }
  };
  const showMoreAnswersBtn = (<button className="load-answer" onClick={handleLoadMoreAnswers} type="submit">Load More Answers</button>);
  const helpfulBtn = (
    <span
      role="button"
      onKeyPress={handleHelpfulQuestion}
      onClick={(e) => handleHelpfulQuestion(e)}
      tabIndex={-1}
      className="helpful-btn"
    >
      Yes
    </span>
  );
  return (
    <div className="QA-tile">
      <div className="QA-question">
        <div className="QA-question-body">
          Q:
          &nbsp;
          {question_body}
        </div>
        <div className="QA-question-header">
          By:
          {' '}
          {asker_name}
          ,
          {' '}
          {Moment(question_date).format('MMMM DD, YYYY')}
          &nbsp;
          |&nbsp;Helpful?
          &nbsp;
          {!isLimitHelpful ? helpfulBtn : (<span style={{ fontWeight: 'bold' }}>Yes</span>)}
          {/* // <span */}
          {/* //   role="button"
            //   onKeyPress={handleHelpfulQuestion}
            //   onClick={(e) => handleHelpfulQuestion(e)}
            //   tabIndex={-1}
            //   className="pointer"
            // >
            //   <strong>Yes</strong>
          // </span> */}
          {/* {//TODO onclick toggleFn for "YES"} */}
          &nbsp;
          (
          {helpfulnessAlias}
          )&nbsp;
          |
          &nbsp;
          <AnswerModal question_id={question_id} getQuestions={getQuestions} />
          {/* //TODO onlick modal for "Add Answer" */}
        </div>
      </div>
      {sortedAnswers.length !== 0 && (
        <div className="QA-answer-list">
          {sortedAnswers.slice(0, count).map((answer) => (
            <Answer
              answer={answer}
              key={answer.body}
              getQuestions={getQuestions}
            />
          ))}
          {sortedAnswers.length > count ? showMoreAnswersBtn : button}
          {/* {button} */}
        </div>
      )}
    </div>
  );
};

Question.propTypes = {
  question_body: PropTypes.string,
  question_date: PropTypes.string,
  asker_name: PropTypes.string,
  question_helpfulness: PropTypes.number,
  question_id: PropTypes.number,
  getQuestions: PropTypes.func,
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
  getQuestions: PropTypes.func,
};

export default Question;
