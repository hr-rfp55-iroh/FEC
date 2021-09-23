import React, { Suspend, lazy } from 'react';
import PropTypes from 'prop-types';

const CharacteristicBar = lazy(() => import('./CharacteristicBar'));

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
      {barInfo.map((info, index) => {
        const charBarCount = index + 1;
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <CharacteristicBar info={info} key={`charBar-${charBarCount}`} />
          </Suspense>
        );
      })}
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
