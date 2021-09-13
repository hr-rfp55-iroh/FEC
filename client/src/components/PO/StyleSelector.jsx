import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StyleSelector = (props) => {
  const { productId } = props;
  const [styleId, setStyleId] = useState(0);

  useEffect(() => {
    axios.get(`/po/styles/${productId}`)
      .then((results) => {
        console.log(results.data.results);
      });
  });

  return (
    <div>
      Style Selector
    </div>
  );
};

export default StyleSelector;
