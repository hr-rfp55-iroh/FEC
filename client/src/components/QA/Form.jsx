import React from 'react';

const Form = (props) => (
  <div>
    Questions & Answers
    {/* {props} */}
    <form>
      <input type='text' name='search' placeholder="Search For Your Question Here" />
      <input type='submit' value='submit'></input>
    </form>
  </div>
);

export default Form;
