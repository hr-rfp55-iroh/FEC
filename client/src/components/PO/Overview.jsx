/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Star = lazy(() => import('../RR/Rating/Star'));
const Information = lazy(() => import('./Information'));
const StyleSelector = lazy(() => import('./StyleSelector'));
const AddToCart = lazy(() => import('./AddToCart'));
const ImageGallery = lazy(() => import('./ImageGallery'));

import { PoInfoPnl, PoOverviewPnl } from '../GlobalStyle';

const Overview = (props) => {
  const { selected, rating } = props;

  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [skus, setSkus] = useState({});
  const [photos, setPhotos] = useState([]);

  // style states
  const [styles, setStyles] = useState([]);
  const [styleName, setStyleName] = useState('');
  const [styleIndex, setStyleIndex] = useState(0);
  const [styleId, setStyleId] = useState(-1);
  const [styleChanges, setStyleChanges] = useState(false);
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);

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
            setPhotos(result.photos);
            setPrice(result.original_price);
            setSalePrice(result.sale_price);
            setPhotoIndex(0);
          }
        }
      });
  }, [selected]);

  // Set style specific arrays
  useEffect(() => {
    if (styles.length === 0 || styles[styleIndex] === undefined) {
      return;
    }

    setPhotoIndex(0);
    setPhotos(styles[styleIndex].photos);
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
        <Suspense fallback={<div>Loading...</div>}>
          <ImageGallery
            selected={selected}
            photos={photos}
            photoIndex={photoIndex}
            setPhotoIndex={setPhotoIndex}
          />
        </Suspense>
      </div>
      <PoInfoPnl>
        <div className="star-rating">
          {rating && (
            <Suspense fallback={<div>Loading...</div>}>
              <Star rating={rating} name="rating-overview" />
            </Suspense>
          )}
          <a href="#RR" id="link-RR">Read all reviews</a>
        </div>
        <br />
        <Suspense fallback={<div>Loading...</div>}>
          <Information category={category} name={name} />
          <br />
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
          <br />
          <AddToCart skus={skus} />
          <br />
        </Suspense>
        <div id="sns-bar">
          <div>Share on Social Media</div>
          <br />
          <div>
            <img
              className="sns-icons"
              src="./static/icon-twitter.svg"
              height="25"
              alt="twitter"
            />
            <img
              className="sns-icons"
              src="./static/icon-facebook.svg"
              height="25"
              alt="facebook"
            />
            <img
              className="sns-icons"
              src="./static/icon-pinterest.svg"
              height="25"
              alt="pinterest"
            />
          </div>
        </div>
      </PoInfoPnl>
      <PoOverviewPnl>
        {description}
      </PoOverviewPnl>
    </div>
  );
};

Overview.propTypes = {
  selected: PropTypes.number,
  rating: PropTypes.number,
};

Overview.defaultProps = {
  selected: 1,
  rating: 0,
};

export default Overview;
