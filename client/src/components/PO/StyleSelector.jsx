/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-restricted-syntax */
import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const Style = lazy(() => import('./Style'));

const StyleSelector = (props) => {
  const { styles, styleChanges } = props;
  const { styleName, price, salePrice } = props;
  const {
    setPrice,
    setSalePrice,
    setStyleName,
    setStyleIndex,
    setStyleId,
    setStyleChanges,
  } = props;

  // Conditional rendering of prices block
  const priceDiv = salePrice
    ? (
      <div id="prices">
        <div id="original-price" style={{ textDecoration: 'line-through' }}>
          {price}
        </div>
        <div id="sale">
          {salePrice}
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

  const mappedList = styles.map(
    (style, index) => (
      <Suspense key={style.style_id.toString()} fallback={<div>Loading...</div>}>
        <Style
          thumb={style.photos[0].thumbnail_url}
          selected={style['default?']}
          price={style.original_price}
          salePrice={style.sale_price}
          name={style.name}
          index={index}
          styleId={style.style_id}
          styleChanges={styleChanges}
          setStyleChanges={setStyleChanges}
          setPrice={setPrice}
          setSalePrice={setSalePrice}
          setStyleName={setStyleName}
          setStyleIndex={setStyleIndex}
          setStyleId={setStyleId}
        />
      </Suspense>
    ),
  );

  return (
    <div>
      <div className="infos">{priceDiv}</div>
      <div className="infos">{styleName}</div>
      <div id="style-selector">
        {mappedList}
      </div>
    </div>
  );
};

StyleSelector.propTypes = {
  styles: PropTypes.array,
  styleChanges: PropTypes.bool,
  styleName: PropTypes.string,
  price: PropTypes.string,
  salePrice: PropTypes.string,
};

StyleSelector.propTypes = {
  setPrice: PropTypes.func,
  setSalePrice: PropTypes.func,
  setStyleName: PropTypes.func,
  setStyleIndex: PropTypes.func,
  setStyleId: PropTypes.func,
  setStyleChanges: PropTypes.func,
};

StyleSelector.defaultProps = {
  styles: [],
  styleChanges: false,
  styleName: '',
  price: '',
  salePrice: '',
};

StyleSelector.defaultProps = {
  setPrice: null,
  setSalePrice: null,
  setStyleName: null,
  setStyleIndex: null,
  setStyleId: null,
  setStyleChanges: null,
};

export default StyleSelector;
