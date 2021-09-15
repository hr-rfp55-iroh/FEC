/* eslint-disable no-restricted-syntax */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AddToCart = (props) => {
  const { skus } = props;
  const [quantities, setQuantities] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [dropdown, setDropdown] = useState(0);

  useEffect(() => {
    if (Object.keys(skus).length === 0) { return; }

    const newInventory = [];
    const newSizes = [];
    for (const sku in skus) {
      if (Object.prototype.hasOwnProperty.call(skus, sku)) {
        newSizes.push(skus[sku].size);
        newInventory.push(skus[sku].quantity);
      }
    }
    setSizes(newSizes);
    setInventory(newInventory);
  }, [skus]);

  const mappedSizes = sizes.map((size, index) => (
    <option key={index.toString()} value={index}>
      {size}
    </option>
  ));

  const mappedQuantities = quantities.length === 0
    ? (<option value="-1" disabled>-</option>)
    : quantities.map((amount, index) => (
      <option key={index.toString()}>
        {amount}
      </option>
    ));

  useEffect(() => {
    console.log('A change has happened!');
    const limit = inventory[dropdown] > 15 ? 15 : inventory[dropdown];
    const stockNums = Array.from({ length: limit }, (v, k) => k + 1);
    setQuantities(stockNums);
  }, [dropdown]);

  return (
    <div>
      <div>Add To Cart</div>
      <select
        defaultValue="-1"
        onChange={(e) => setDropdown(e.target.value)}
        id="size-selection"
      >
        <option value="-1">Select Size</option>
        {mappedSizes}
      </select>
      <select defaultValue="-1" onChange={() => {}} id="quantity-selection">
        {mappedQuantities}
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
