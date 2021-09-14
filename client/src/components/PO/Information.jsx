import React from 'react';
import PropTypes from 'prop-types';

const Information = (props) => {
  const { category, name } = props;
  return (
    <div>
      <div id="category">{category}</div>
      <div id="product-name">{name}</div>
    </div>
  );
};

Information.propTypes = {
  category: PropTypes.string,
  name: PropTypes.string,
};

Information.defaultProps = {
  category: '',
  name: '',
};

export default Information;
