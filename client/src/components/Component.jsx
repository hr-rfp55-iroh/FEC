import React from 'react';
import PropTypes from 'prop-types';

const Component = (props) => {
  const { products } = props;
  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>{product.name}</div>
      ))}
    </div>
  );
};

Component.propTypes = {
  products: PropTypes.array,
};

export default Component;
