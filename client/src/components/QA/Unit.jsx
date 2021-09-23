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
      count: 4, // on page load, display four questions
      display: 'loadMore', // display default loadMore button
      questionsList: [],
      currentList: [],
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleDisplayMoreQ = this.handleDisplayMoreQ.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleDisplayUnitOnSearch = this.handleDisplayUnitOnSearch.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate(prevProps) {
    const { currentProduct } = this.props;
    if (prevProps.currentProduct !== currentProduct) {
      this.getQuestions();
    }
  }

  handleDisplayUnitOnSearch(e, result) {
    const { questionsList } = this.state;
    if (e.length >= 3) {
      this.setState({ display: 'none', currentList: result });
    } else {
      this.setState({ display: 'loadMore', currentList: questionsList });
    }
  }

  handleDisplayMoreQ(e) {
    e.preventDefault();
    const { count, currentList } = this.state;
    this.setState({ count: count + 2 });
    if (count + 1 >= currentList.length) {
      this.setState({ display: 'collapse' });
    }
  }

  handleCollapse() {
    this.setState({ count: 4, display: 'loadMore' });
  }

  getQuestions() {
    const { currentProduct } = this.props;
    axios(`/qa/questions/${currentProduct}`, { params: { count: 25 } })
      .then((results) => this.setState({
        isQuestionsLoaded: true,
        questionsList: results.data.results,
        currentList: results.data.results,
      }))
      .catch(() => this.setState({ isQuestionsLoaded: false }));
  }

  render() {
    const {
      isQuestionsLoaded, questionsList, count, display, currentList,
    } = this.state;
    let list;
    const { currentProduct } = this.props;
    if (isQuestionsLoaded) {
      list = currentList.map((q) => (
        <Question
          className="question-component"
          key={q.question_id}
          question_id={q.question_id}
          question_body={q.question_body}
          question_date={q.question_date}
          asker_name={q.asker_name}
          question_helpfulness={q.question_helpfulness}
          answers={q.answers}
          getQuestions={this.getQuestions}
        />
      )).slice(0, count);
    }
    return (
      <div className="QA-container">
        <Form
          questionsList={questionsList}
          handleDisplayUnitOnSearch={this.handleDisplayUnitOnSearch}
        />
        <div className="QA-list">
          {list}
        </div>
        <div className="QA-btn-list">
          <QuestionModal currentProduct={currentProduct} getQuestions={this.getQuestions} />
          <div>
            {(() => {
              if (display === 'loadMore') {
                return (<button id="load-questions-btn" className="button-modal" type="submit" onClick={(e) => this.handleDisplayMoreQ(e)}>LOAD MORE QUESTIONS</button>);
              } if (display === 'collapse') {
                return (<button id="collapse-questions-btn" className="collapse-question" type="submit" onClick={this.handleCollapse}>COLLAPSE</button>);
              } if (display === 'none') {
                return ('');
              }
            })()}
          </div>
        </div>
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
