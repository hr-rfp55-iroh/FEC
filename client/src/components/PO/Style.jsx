import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Style = (props) => {
  const {
    selected,
    thumb,
    name,
    selectedStyle,
    setSelectedStyle,
  } = props;

  const handleSelection = () => {
    setSelectedStyle(selectedStyle);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleSelection}
      onKeyPress={handleSelection}
      className="style-thumb"
    >
      <img alt="style option" title={name} src={thumb} />
    </div>
  );
};

Style.propTypes = {
  selected: PropTypes.bool,
  thumb: PropTypes.string,
  name: PropTypes.string,
  selectedStyle: PropTypes.number,
  setSelectedStyle: PropTypes.func,
};

Style.defaultProps = {
  selected: false,
  thumb: '',
  name: '',
  selectedStyle: -1,
  setSelectedStyle: null,
};

export default Style;
