/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Style from './Style';

const StyleSelector = (props) => {
  const { productSelected, setSkus } = props;

  const [price, setPrice] = useState('');
  const [sale, setSale] = useState('');
  const [styleId, setStyleId] = useState(-1);
  const [styleIndex, setStyleIndex] = useState(0);
  const [styleName, setStyleName] = useState('');
  const [styles, setStyles] = useState([]);

  // Displays a product's styles when product is selected
  useEffect(() => {
    axios.get(`/po/styles/${productSelected}`)
      .then((results) => {
        setStyles(results.data.results);
      });
  }, [productSelected]);

  useEffect(() => {
    if (styles.length === 0) { return; }

    setSkus(styles[styleIndex].skus);
  }, [styleIndex]);

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
    (style, index) => (
      <Style
        index={index}
        setIndex={setStyleIndex}
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

  // Set initial values for name, skus and price
  const defaultName = styles.length === 0 ? '' : styles[0].name;
  if (styleName === '' && defaultName !== '') { setStyleName(defaultName); }

  const defaultSkus = styles.length === 0 ? '' : styles[0].skus;
  if (defaultSkus !== '' && styleIndex === 0) { setSkus(defaultSkus); }

  if (styles.length !== 0 && price === '') {
    const defaultPrice = styles[0].sale_price
      ? styles[0].sale_price
      : styles[0].original_price;

    setPrice(defaultPrice);
  }

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
  productSelected: PropTypes.number,
  setSkus: PropTypes.func,
};

StyleSelector.defaultProps = {
  productSelected: -1,
  setSkus: null,
};

export default StyleSelector;
