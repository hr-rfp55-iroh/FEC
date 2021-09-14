import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import StarRating from './StarRating';
import Information from './Information';
import StyleSelector from './StyleSelector';

const Overview = (props) => {
  const { selected } = props;
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    axios.get(`/po/info/${selected}`)
      .then((results) => {
        setCategory(results.data.category);
        setName(results.data.name);
        setDescription(results.data.description);
      });
  }, [selected]);

  // Displays a product's styles when product is selected
  useEffect(() => {
    axios.get(`/po/styles/${selected}`)
      .then((results) => {
        setStyles(results.data.results);
      });
  }, [selected]);

  return (
    <div id="product-overview">
      <div id="po-gallery-pnl">
        <li>Image Gallery</li>
      </div>
      <div id="po-info-pnl">
        <StarRating />
        <Information category={category} name={name} />
        {/* TODO: Price should depend on style. Price could also be on sale. */}
        <StyleSelector
          styles={styles}
          setStyles={setStyles}
        />
        <li>Share on Social Media</li>
      </div>
      <div id="po-overview-pnl">
        {description}
      </div>
    </div>
  );
};

Overview.propTypes = {
  selected: PropTypes.number,
};

Overview.defaultProps = {
  selected: 1,
};

export default Overview;
