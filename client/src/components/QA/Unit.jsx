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
    axios('http://localhost:3004/qa/questions')
      .then((results) => console.log(results))
      .catch((err) => this.setState({ isQuestionsLoaded: false, error: err.response.data, }));
  }

  render() {
    return (
      <div>
        <Question />
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
