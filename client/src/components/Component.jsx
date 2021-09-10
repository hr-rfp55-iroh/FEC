import React from 'react';
import PropTypes from 'prop-types';

const Component = (props) => {
  const { products } = props;
  return (
    <div>
      { products }
      hello
    </div>
  );
};

Component.propTypes = {
  products: PropTypes.array,
};

export default Component;
