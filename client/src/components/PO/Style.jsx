/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Style = (props) => {
  const {
    selected,
    thumb,
    styleId,
    name,
    price,
    sale,
    setStyleId,
    setStyleName,
    setPrice,
    setSale,
  } = props;

  const [checkmark, setCheckmark] = useState('');

  useEffect(() => {
    if (selected) { setCheckmark('✔️'); } else { setCheckmark(''); }
  }, [selected]);

  const handleSelection = () => {
    setSale(sale);
    setPrice(price);
    setCheckmark('✔️');
    setStyleName(name);
    setStyleId(styleId);
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
  styleId: PropTypes.number,
  setStyleId: PropTypes.func,
  setStyleName: PropTypes.func,
};

Style.defaultProps = {
  selected: false,
  thumb: '',
  name: '',
  styleId: -1,
  setStyleId: null,
  setStyleName: null,
};

export default Style;
