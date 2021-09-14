/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Style from './Style';

const StyleSelector = (props) => {
  const { styles, setStyles } = props;

  const [price, setPrice] = useState('');
  const [sale, setSale] = useState('');
  const [styleId, setStyleId] = useState(-1);
  const [styleName, setStyleName] = useState('');

  // Conditional rendering of prices block
  const priceDiv = sale
    ? (
      <div id="prices">
        <div id="original-price" style={{ textDecoration: 'line-through' }}>
          {price}
        </div>
        <div id="sale">
          {sale}
        </div>
      </div>
    )
    : (
      <div id="prices">
        <div id="original-price">
          {price}
        </div>
      </div>
    );

  // Sets the selected style and rerenders list of styles.
  useEffect(() => {
    const newStyles = [...styles];

    for (const style of newStyles) {
      style['default?'] = style.style_id === styleId;
    }

    setStyles(newStyles);
  }, [styleId]);

  const mappedList = styles.map(
    (style) => (
      <Style
        thumb={style.photos[0].thumbnail_url}
        key={style.style_id}
        setStyleName={setStyleName}
        setStyleId={setStyleId}
        setPrice={setPrice}
        setSale={setSale}
        name={style.name}
        styleId={style.style_id}
        price={style.original_price}
        sale={style.sale_price}
        selected={style['default?']}
      />
    ),
  );

  // Set initial values for name and price
  const defaultName = styles.length === 0 ? '' : styles[0].name;
  if (styleName === '' && defaultName !== '') { setStyleName(defaultName); }

  const defaultPrice = styles.length === 0 ? '' : styles[0].original_price;
  if (price === '' && defaultPrice !== '') { setPrice(defaultPrice); }

  return (
    <div>
      {priceDiv}
      <div>{styleName}</div>
      <div id="style-selector">
        {mappedList}
      </div>
    </div>
  );
};

// TODO: Put array in parent component, do not pass as prop
StyleSelector.propTypes = {
  styles: PropTypes.array,
  setStyles: PropTypes.func,
};

StyleSelector.defaultProps = {
  styles: [],
  setStyles: null,
};

export default StyleSelector;
