/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Style from './Style';

const StyleSelector = (props) => {
  const { productId } = props;
  const [selectedStyle, setSelectedStyle] = useState(-1);
  const [styles, setStyles] = useState([]);

  // Displays a product's styles when product is selected
  useEffect(() => {
    axios.get(`/po/styles/${productId}`)
      .then((results) => {
        setStyles(results.data.results);
      });
  }, [productId]);

  // Sets the selected style and rerenders list of styles.
  useEffect(() => {
    for (const style of styles) {
      style['default?'] = style.style_id === selectedStyle;
    }
    setStyles(styles);
  }, [selectedStyle]);

  const mappedList = styles.map(
    (style) => (
      <Style
        key={style.style_id}
        setSelectedStyle={setSelectedStyle}
        selectedStyle={style.style_id}
        name={style.name}
        selected={style['default?']}
        thumb={style.photos[0].thumbnail_url}
      />
    ),
  );

  return (
    <div id="style-selector">
      {mappedList}
    </div>
  );
};

StyleSelector.propTypes = {
  productId: PropTypes.number,
};

StyleSelector.defaultProps = {
  productId: 1,
};

export default StyleSelector;
