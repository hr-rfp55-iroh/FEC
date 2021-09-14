/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
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

  const [checkmark, setCheckmark] = useState('');

  useEffect(() => {
    if (selected) { setCheckmark('😊'); } else { setCheckmark(''); }
  }, [selected]);

  const handleSelection = () => {
    if (!selected) { setCheckmark('😊'); }
    setSelectedStyle(selectedStyle);
  };

  const checkmarkDiv = (
    <div id="checkmark">{checkmark}</div>
  );

  return (
    <div
      className="style-thumb"
      onClick={handleSelection}
      onKeyPress={handleSelection}
      role="button"
      tabIndex={0}
    >
      <img
        alt={name}
        title={name}
        src={thumb}
      />
      {checkmarkDiv}
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
