import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StyleSelector = (props) => {
  const { productId } = props;
  const [styleId, setStyleId] = useState(0);
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    axios.get(`/po/styles/${productId}`)
      .then((results) => {
        setStyles(results.data.results);
      });
  }, [styleId]);

  const mappedList = styles.map((style) => <li>{style.name}</li>);

  return (
    <div>
      {mappedList}
    </div>
  );
};

export default StyleSelector;
