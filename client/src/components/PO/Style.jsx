/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Style = (props) => {
  const { selected } = props;
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
    setStyleChanges(localChanges);
  }, [localChanges]);

  const checkmarkDiv = selected
    ? (<div id="checkmark">✅</div>)
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

// thumb={style.photos[0].thumbnail_url}
// selected={style['default?']}
// price={style.original_price}
// salePrice={style.sale_price}
// name={style.name}
// index={index}
// styleId={style.style_id}
// setStyleChanges={setStyleChanges}
// setPrice={setPrice}
// setSalePrice={setSalePrice}
// setStyleName={setStyleName}
// setStyleIndex={setStyleIndex}
// setStyleId={setStyleId}

Style.propTypes = {
  selected: PropTypes.bool,
  price: PropTypes.string,
  sale: PropTypes.string,
  thumb: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
  styleId: PropTypes.number,
  setStyleId: PropTypes.func,
  setStyleName: PropTypes.func,
  setPrice: PropTypes.func,
  setSale: PropTypes.func,
  setIndex: PropTypes.func,
};

Style.defaultProps = {
  selected: false,
  price: '',
  sale: '',
  thumb: '',
  name: '',
  index: 0,
  styleId: -1,
  setStyleId: null,
  setStyleName: null,
  setPrice: null,
  setSale: null,
  setIndex: null,
};

export default Style;
