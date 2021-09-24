import React, { useState, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'moment';

const Answer = lazy(() => import('./Answer'));
const AnswerModal = lazy(() => import('./AnswerModal'));

import { Tile, QuestionHeader } from '../GlobalStyle';

const Question = ({
  question_body, question_date, asker_name,
  answers, question_id, question_helpfulness, getQuestions, productName,
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
      .then(() => getQuestions())
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
    <Tile>
      <div className="QA-tile">
        <QuestionHeader>
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
              &nbsp;
              (
              {helpfulnessAlias}
              )&nbsp;
              |
              &nbsp;
              <Suspense fallback={<div>Loading...</div>}>
                <AnswerModal question_id={question_id} getQuestions={getQuestions} question={question_body} productName={productName} />
              </Suspense>
              {/* //TODO onlick modal for "Add Answer" */}
            </div>
          </div>
        </QuestionHeader>
        {sortedAnswers.length !== 0 && (
          <div className="QA-answer-list">
            {sortedAnswers.slice(0, count).map((answer) => (
              <Suspense key={answer.body} fallback={<div>Loading...</div>}>
                <Answer
                  answer={answer}
                  getQuestions={getQuestions}
                />
              </Suspense>
            ))}
            {sortedAnswers.length > count ? showMoreAnswersBtn : button}
            {/* {button} */}
          </div>
        )}
      </div>
    </Tile>
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
