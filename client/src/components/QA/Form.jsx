import React, { useState } from 'react';

const Form = (props) => { // TODO take in props as a param
  const { questionsList, handleDisplayUnitOnSearch, getResultFromSearch } = props;
  const questions = questionsList;
  const [search, setSearch] = useState('');
  // const [result, setResult] = useState('');
  const handleSearch = (e) => {
    setSearch(e);
    handleDisplayUnitOnSearch(e);
    const alias = questions.filter((question) => {
      const q = question.question_body.toLowerCase();
      return q.includes(search);
    });
    getResultFromSearch(alias);
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
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Form;
