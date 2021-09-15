import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Form = (props) => { // TODO take in props as a param
  const { questionsList, handleDisplayUnitOnSearch, getResultFromSearch } = props;
  const questions = questionsList;
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e);
    handleDisplayUnitOnSearch(e);
    const result = questions.filter((question) => {
      const q = question.question_body.toLowerCase();
      return q.includes(search);
    });
    getResultFromSearch(result);
  };

  return (
    <div>
      Questions & Answers
      <form>
        <input
          type="text"
          value={search}
          name="search"
          placeholder="Search For Your Question Here"
          className="searchBar"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
    </div>
  );
};
Form.propTypes = {
  handleDisplayUnitOnSearch: PropTypes.func,
  getResultFromSearch: PropTypes.func,
  questionsList: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.shape({
      answerer_name: PropTypes.string,
      body: PropTypes.string,
      date: PropTypes.string,
      helpfulness: PropTypes.number,
      id: PropTypes.number,
      photos: PropTypes.arrayOf(PropTypes.string),
    }),
  })),
  answer: PropTypes.shape({
    answerer_name: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    helpfulness: PropTypes.number,
    id: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
  }),
};

Form.defaultProps = {
  questionsList: '',
  answer: '',
  handleDisplayUnitOnSearch: '',
  getResultFromSearch: '',

};
export default Form;
