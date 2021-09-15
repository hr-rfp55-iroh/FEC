/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CartMenu = (props) => {
  // NOTE: Default sku is undefined. Default amount is empty string.
  const {
    sku,
    amount,
    inventory,
    setInventory,
    index,
  } = props;

  const [subtract, setSubtract] = useState(0);

  useEffect(() => {
    const newInventory = [...inventory];
    newInventory[index] -= subtract;
    setInventory(newInventory);
  }, [subtract]);

  const handleAddToCart = () => {
    const item = { sku_id: sku };
    const counts = Array.from({ length: amount }, (v, k) => k + 1);

    // eslint-disable-next-line no-unused-vars
    for (const count of counts) {
      axios.post('/cart', item)
        .then((results) => {
          console.log('Success!', results);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    setSubtract(amount);
  };

  return (
    <div id="cart-menu">
      <button
        onClick={handleAddToCart}
        aria-label="Add to Cart"
        type="button"
      >
        +
      </button>
    </div>
  );
};

CartMenu.propTypes = {
  sku: PropTypes.string,
  amount: PropTypes.string,
};

CartMenu.defaultProps = {
  sku: undefined,
  amount: '-1',
};

export default CartMenu;
