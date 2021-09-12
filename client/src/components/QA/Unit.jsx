import React from 'react';
import axios from 'axios';
import Question from './Question';
import Answer from './Answer';

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
    // currently will just use product_id 40344 for now
    const req = { product_id: 40344 };
    axios(`http://localhost:3004/qa/questions/?product_id=${req.product_id}`, req)
      .then((results) => this.setState({ allQuestions: results.data, isQuestionsLoaded: true }))
      .catch((err) => this.setState({ isQuestionsLoaded: false, error: err.response.data }));
  }

  render() {
    const { isQuestionsLoaded, allQuestions } = this.state;
    return (
      <div>
        <Question isQuestionsLoaded={isQuestionsLoaded} allQuestions={allQuestions} />
        <br />
        <Answer />
        <br />
        <button type="submit">Load More Answers</button>
        <div>
          <button type="submit">Load More Questions</button>
          <button type="submit">Add A Question</button>
        </div>
      </div>
    );
  }
}

export default Unit;
