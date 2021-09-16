/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import StarRating from './StarRating';
import Information from './Information';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';

const Overview = (props) => {
  const { selected } = props;

  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [skus, setSkus] = useState({});
  // const [thumbnails, setThumbnails] = useState([]);

  // style states
  const [styles, setStyles] = useState([]);
  const [styleName, setStyleName] = useState('');
  const [styleIndex, setStyleIndex] = useState(0);
  const [styleId, setStyleId] = useState(-1);
  const [styleChanges, setStyleChanges] = useState(false);
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');

  // Fetches the info for the product
  useEffect(() => {
    axios.get(`/po/info/${selected}`)
      .then((results) => {
        setCategory(results.data.category);
        setName(results.data.name);
        setDescription(results.data.description);
      });
  }, [selected]);

  // Fetches the product's styles when product is selected
  useEffect(() => {
    axios.get(`/po/styles/${selected}`)
      .then((results) => {
        setStyles(results.data.results);

        return results.data.results;
      })
      .then((results) => {
        for (const result of results) {
          if (result['default?']) {
            setStyleId(result.style_id);
            setStyleName(result.name);
            setSkus(result.skus);
            setPrice(result.original_price);
            setSalePrice(result.sale_price);
          }
        }
      });
  }, [selected]);

  // Set a list of skus when index is set
  useEffect(() => {
    if (styles.length === 0 || styles[styleIndex] === undefined) { return; }

    setSkus(styles[styleIndex].skus);
  }, [styleChanges]);

  // Rebuilds styles list on new style selection
  useEffect(() => {
    const newStyles = [...styles];

    for (const style of newStyles) {
      style['default?'] = style.style_id === styleId;
    }

    setStyles(newStyles);
  }, [styleChanges]);

  return (
    <div id="product-overview">
      <div id="po-gallery-pnl">
        <li>Image Gallery</li>
      </div>
      <div id="po-info-pnl">
        <StarRating />
        <Information category={category} name={name} />
        <StyleSelector
          styles={styles}
          styleName={styleName}
          price={price}
          salePrice={salePrice}
          styleChanges={styleChanges}
          setPrice={setPrice}
          setSalePrice={setSalePrice}
          setStyleName={setStyleName}
          setStyleIndex={setStyleIndex}
          setStyleId={setStyleId}
          setStyleChanges={setStyleChanges}
        />
        <AddToCart skus={skus} />
        <div id="sns-bar">
          <span>Share on Socal Media</span>
          <div>
            <img
              className="sns-icons"
              src="./static/icon-twitter.svg"
              height="50"
              alt="twitter"
            />
            <img
              className="sns-icons"
              src="./static/icon-facebook.svg"
              height="50"
              alt="facebook"
            />
            <img
              className="sns-icons"
              src="./static/icon-pinterest.svg"
              height="50"
              alt="pinterest"
            />
          </div>
        </div>
      </div>
      <div id="po-overview-pnl">
        {description}
      </div>
    </div>
  );
};

Overview.propTypes = {
  selected: PropTypes.number,
};

Overview.defaultProps = {
  selected: 1,
};

export default Overview;
