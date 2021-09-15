/* eslint-disable no-restricted-syntax */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AddToCart = (props) => {
  const { skus } = props;
  const [quantities, setQuantities] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    // const newQuantities = [];
    const newSizes = [];
    if (Object.keys(skus).length === 0) { return; }
    for (const sku in skus) {
      if (Object.prototype.hasOwnProperty.call(skus, sku)) {
        newSizes.push(skus[sku].size);
      }
    }

    setSizes(newSizes);
  }, [skus]);

  // const mappedQuantities = quantities.map((quantity) => <option>{quantity}</option>);
  const mappedSizes = sizes.map((size, index) => (
    <option key={index.toString()} value={index}>{size}</option>
  ));

  return (
    <div>
      <div>Add To Cart</div>
      <select onChange={() => {}} id="size-selection">
        <option value="-1">Select Size</option>
        {mappedSizes}
      </select>
      <select onChange={() => {}} id="quantity-selection">
        <option value="-1">-</option>
      </select>
    </div>
  );
};

AddToCart.propTypes = {
  skus: PropTypes.object,
};

AddToCart.defaultProps = {
  skus: null,
};

export default AddToCart;
