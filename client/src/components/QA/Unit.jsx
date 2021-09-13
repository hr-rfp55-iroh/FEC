import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Question from './Question';
import Answer from './Answer';
import Modal from '../Shared/Modal';
import QuestionModal from '../Shared/QuestionModal';

class Unit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    const { currentProduct } = this.props;
    const req = { product_id: currentProduct };
    axios(`http://localhost:3004/qa/questions/?product_id=${req.product_id}`, req)
      .then((results) => this.setState({
        allQuestions: results.data,
        isQuestionsLoaded: true,
        questionsList: results.data.results,
      }))
      .catch((err) => this.setState({ isQuestionsLoaded: false, error: err.response.data }));
  }

  render() {
    const {
      isQuestionsLoaded, allQuestions, error, questionsList,
    } = this.state;
    return (
      <div>
        {!isQuestionsLoaded || error ? '' : (
          <div>
            <Question
              allQuestions={allQuestions}
              questionsList={questionsList}
            />
            <br />
            <QuestionModal />
            <Modal />
            <Answer />
            <br />
            <button type="submit">Load More Answers</button>
            <div>
              <button type="submit">Load More Questions</button>
              <button type="submit">Add A Question</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Unit.propTypes = {
  currentProduct: PropTypes.number,

};
Unit.defaultProps = {
  currentProduct: 40344,

};

export default Unit;
