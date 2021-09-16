/* eslint-disable no-restricted-syntax */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CartMenu from './CartMenu';

const AddToCart = (props) => {
  const { skus } = props;
  const [skusArray, setSkusArray] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [dropdown, setDropdown] = useState(-1);
  const [cartAmount, setCartAmount] = useState(1);

  // TODO: Refactor setSkusArray to appear in its own useEffect block.
  useEffect(() => {
    const temp = Object.keys(skus);
    if (temp.length === 0) { return; }

    setSkusArray(temp);

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
    const limit = inventory[dropdown] > 15 ? 15 : inventory[dropdown];
    const stockNums = Array.from({ length: limit }, (v, k) => k + 1);
    setQuantities(stockNums);
  }, [dropdown, inventory]);

  return (
    <div id="add-to-cart">
      <div className="cart-division">
        <select
          defaultValue="-1"
          onChange={(e) => setDropdown(Number(e.target.value))}
          id="size-selection"
        >
          <option value="-1">SELECT SIZE</option>
          {mappedSizes}
        </select>
        <select
          defaultValue="-1"
          onChange={(e) => setCartAmount(Number(e.target.value))}
          id="quantity-selection"
        >
          {mappedQuantities}
        </select>
      </div>
      <div className="cart-division">
        <CartMenu
          inventory={inventory}
          setInventory={setInventory}
          index={dropdown}
          amount={cartAmount}
          setAmount={setCartAmount}
          sku={skusArray[dropdown]}
        />
      </div>
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
