/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Style = (props) => {
  const { selected, styleChanges } = props;
  const { thumb, price, salePrice } = props;
  const { name, index, styleId } = props;
  const {
    setStyleChanges,
    setPrice,
    setSalePrice,
    setStyleName,
    setStyleIndex,
    setStyleId,
  } = props;

  const [localChanges, setLocalChanges] = useState(false);

  useEffect(() => {
    setStyleChanges(!styleChanges);
  }, [localChanges]);

  const checkmarkDiv = selected
    ? (
      <div id="checkmark">
        <img
          src="./static/checkmark.svg"
          alt="checkmark"
        />
      </div>
    )
    : (<div id="checkmark" />);

  const handleClick = () => {
    // Reset options for size and quantity in AddToCart.jsx
    const sizeOption = document.getElementById('size-selection');

    sizeOption.value = -1;
    const event = new Event('change', { bubbles: true });
    sizeOption.dispatchEvent(event);

    // Set all appropriate info and trigger rerender
    setPrice(price);
    setSalePrice(salePrice);
    setStyleName(name);
    setStyleIndex(index);
    setStyleId(styleId);
    setLocalChanges(!localChanges);
  };

  return (
    <div
      className="style-thumb"
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}
    >
      {(() => {
        if (thumb) {
          return (
            <img
              alt={name}
              title={name}
              src={thumb}
            />
          );
        }
        return ('');
      })()}
      {checkmarkDiv}
    </div>
  );
};

Style.propTypes = {
  thumb: PropTypes.string,
  selected: PropTypes.bool,
  styleChanges: PropTypes.bool,
  price: PropTypes.string,
  salePrice: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
  styleId: PropTypes.number,
};

Style.propTypes = {
  setStyleChanges: PropTypes.func,
  setStyleId: PropTypes.func,
  setStyleName: PropTypes.func,
  setPrice: PropTypes.func,
  setSalePrice: PropTypes.func,
  setStyleIndex: PropTypes.func,
};

Style.defaultProps = {
  selected: false,
  styleChanges: false,
  price: '',
  salePrice: '',
  thumb: '',
  name: '',
  index: 0,
  styleId: -1,
};

Style.defaultProps = {
  setStyleChanges: null,
  setStyleId: null,
  setStyleName: null,
  setPrice: null,
  setSalePrice: null,
  setStyleIndex: null,
};

export default Style;
