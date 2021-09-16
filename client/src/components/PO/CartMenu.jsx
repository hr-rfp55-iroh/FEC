/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CartMenu = (props) => {
  // NOTE: Default sku is undefined. Default amount is empty string.
  const {
    sku,
    amount,
    setAmount,
    inventory,
    setInventory,
    index,
  } = props;

  const handleSubtract = (subtract) => {
    const newInventory = [...inventory];
    newInventory[index] -= subtract;
    setAmount(newInventory[index]);
    setInventory(newInventory);
  };

  const handleAddToCart = () => {
    if (index === -1) {
      return;
    }

    const item = { sku_id: sku };
    const counts = Array.from({ length: amount }, (v, k) => k + 1);

    // eslint-disable-next-line no-unused-vars
    for (const count of counts) {
      axios.post('/cart', item)
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    }

    handleSubtract(amount);
  };

  return (
    <div id="cart-menu">
      {(() => {
        if (inventory[index] === 0) { return ('Out of Stock'); }
        return (
          <button
            onClick={handleAddToCart}
            aria-label="Add to Cart"
            type="button"
          >
            +
          </button>
        );
      })()}
    </div>
  );
};

CartMenu.propTypes = {
  sku: PropTypes.string,
  amount: PropTypes.number,
  setAmount: PropTypes.func,
  inventory: PropTypes.array,
  setInventory: PropTypes.func,
  index: PropTypes.number,
};

CartMenu.defaultProps = {
  sku: undefined,
  amount: '-1',
  setAmount: null,
  inventory: [],
  setInventory: null,
  index: -1,
};

export default CartMenu;
