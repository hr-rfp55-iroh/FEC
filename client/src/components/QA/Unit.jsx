import React, { Suspense, lazy } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Question = lazy(() => import('./Question'));
const QuestionModal = lazy(() => import('../Shared/QuestionModal'));
const Form = lazy(() => import('./Form'));

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
        productName: document.getElementById('product-name').innerHTML,
      }))
      .catch(() => this.setState({ isQuestionsLoaded: false }));
  }

  render() {
    const {
      isQuestionsLoaded, questionsList, count, display, currentList, productName,
    } = this.state;
    let list;
    const { currentProduct } = this.props;
    if (isQuestionsLoaded) {
      list = currentList.map((q) => (
        <Suspense key={q.question_id} fallback={<div>Loading...</div>}>
          <Question
            className="question-component"
            question_id={q.question_id}
            question_body={q.question_body}
            question_date={q.question_date}
            asker_name={q.asker_name}
            question_helpfulness={q.question_helpfulness}
            answers={q.answers}
            getQuestions={this.getQuestions}
            productName={productName}
          />
        </Suspense>
      )).slice(0, count);
    }
    return (
      <div className="QA-container">
        <Suspense fallback={<div>Loading...</div>}>
          <Form
            questionsList={questionsList}
            handleDisplayUnitOnSearch={this.handleDisplayUnitOnSearch}
          />
        </Suspense>
        <div className="QA-list">
          {list}
        </div>
        <div className="QA-btn-list">
          <Suspense fallback={<div>Loading...</div>}>
            <QuestionModal currentProduct={currentProduct} getQuestions={this.getQuestions} productName={productName} />
          </Suspense>
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
