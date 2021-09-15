import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import StarRating from './StarRating';
import Information from './Information';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';

const Overview = (props) => {
  const { selected } = props;
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [skus, setSkus] = useState([]);

  useEffect(() => {
    axios.get(`/po/info/${selected}`)
      .then((results) => {
        setCategory(results.data.category);
        setName(results.data.name);
        setDescription(results.data.description);
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
        <StyleSelector productSelected={selected} setSkus={setSkus} />
        <AddToCart skus={skus} />
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
