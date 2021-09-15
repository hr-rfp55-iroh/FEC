import React from 'react';
import PropTypes from 'prop-types';
import CharacteristicBar from './CharacteristicBar';

const productBreakdown = (charcsObj) => {
  const result = [];
  const charcs = Object.keys(charcsObj);
  for (let i = 0; i < charcs.length; i += 1) {
    const charc = charcs[i];
    const percent = (charcsObj[charc].value - 1) * 25 || 0;
    result.push({ charc, percent });
  }
  return result;
};

const ProductBreakdown = (props) => {
  const { characteristics } = props;
  const barInfo = productBreakdown(characteristics);
  return (
    <div className="product-breakdown">
      <div className="rating-header">Product Experience</div>
      {barInfo.map((info) => (<CharacteristicBar info={info} />))}
    </div>
  );
};

ProductBreakdown.propTypes = {
  characteristics: PropTypes.objectOf(PropTypes.any),
};

ProductBreakdown.defaultProps = {
  characteristics: {},
};

export default ProductBreakdown;
