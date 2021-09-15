import React, { useState } from 'react';

const Form = (props) => { // TODO take in props as a param
  const { questionsList, handleDisplayUnitOnSearch } = props;
  const questions = questionsList;
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e);
    console.log(search);
    if (e.length >= 3) {
      handleDisplayUnitOnSearch(e);
      const result = questions.filter((question) => {
        const q = question.question_body.toLowerCase();
        return q.includes(search);
      });
      console.log(result);
    }
  };

  return (
    <div>
      Questions & Answers
      {/* {props} */}
      <form>
        <input
          type="text"
          value={search}
          name="search"
          placeholder="Search For Your Question Here"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default Form;
