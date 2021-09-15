import React from 'react';

const AddToCart = (props) => {
  const { skus } = props;

  console.log(skus);

  return (
    <div>
      Add To Cart
    </div>
  );
};

AddToCart.propTypes = {
  skus: PropTypes.object,
};

AddToCart.defaultProps = {
  skus: null,
};

export default AddToCart;
