import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Question from './Question';
import QuestionModal from '../Shared/QuestionModal';
import Form from './Form';

class Unit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleDisplayUnitOnSearch = this.handleDisplayUnitOnSearch.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  handleDisplayUnitOnSearch(e) {
    console.log('from class', e);
  }

  getQuestions() {
    const { currentProduct } = this.props;
    axios(`http://localhost:3004/qa/questions/${currentProduct}`, { params: { count: 25 } })
      .then((results) => this.setState({
        isQuestionsLoaded: true,
        questionsList: results.data.results,
      }))
      .catch((err) => this.setState({ isQuestionsLoaded: false, error: err.response.data }));
  }

  render() {
    const {
      isQuestionsLoaded, error, questionsList,
    } = this.state;
    const { currentProduct } = this.props;
    return (
      <div>
        <Form
          questionsList={questionsList}
          handleDisplayUnitOnSearch={this.handleDisplayUnitOnSearch}
        />
        {!isQuestionsLoaded || error ? '' : (
          <div>
            {questionsList.map((q) => (
              <Question
                key={q.question_id}
                question_id={q.question_id}
                question_body={q.question_body}
                question_date={q.question_date}
                asker_name={q.asker_name}
                question_helpfulness={q.question_helpfulness}
                answers={q.answers}
              />
            ))}
            <br />
            <QuestionModal currentProduct={currentProduct} />
            <br />
            <div>
              <button type="submit">Load More Questions</button>
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
  currentProduct: '',

};

export default Unit;
