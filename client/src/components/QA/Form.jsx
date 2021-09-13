import React from 'react';

const Form = () => ( // TODO take in props as a param
  <div>
    Questions & Answers
    {/* {props} */}
    <form>
      <input type="text" name="search" placeholder="Search For Your Question Here" />
      <input type="submit" value="Search" />
    </form>
  </div>
);

export default Form;
