import React, { useState } from 'react';


const Form = (props) => { // TODO take in props as a param
  const { questionsList } = props;
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    // setSearch(e);
    setSearch(e);
    console.log(search);
    let result = questionsList.filter((question) => {
      let q = question.question_body.toLowerCase();
      return q.includes(search);
    })
    console.log(result);
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
