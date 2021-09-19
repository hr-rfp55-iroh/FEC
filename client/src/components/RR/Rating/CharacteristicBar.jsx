import React from 'react';
import PropTypes from 'prop-types';

const charcsRange = {
  Size: ['Too Small', 'Perfect', 'Too Big'],
  Width: ['Too Narrow', 'Perfect', 'Too Wide'],
  Comfort: ['Poor', 'Great'],
  Quality: ['Poor', 'Great'],
  Length: ['Too Short ', 'Perfect', 'Too Long'],
  Fit: ['Poor', 'Great'],
};

const CharacteristicBar = (props) => {
  const { info } = props;
  const { charc, percent } = info;
  return (
    <div className="charc">
      <div className="charc-label">{charc}</div>
      {percent > 0 && <div style={{ height: '15px', marginLeft: `${percent * 0.98}%` }}>▾</div>}
      <div className="charc-bar">
        <div className="bar-midpoint" />
      </div>
      <div className="charc-scale">
        {charcsRange[charc].map((label) => (<div>{label}</div>))}
      </div>
    </div>
  );
};

CharacteristicBar.propTypes = {
  info: PropTypes.objectOf(PropTypes.any),
};

CharacteristicBar.defaultProps = {
  info: {},
};

export default CharacteristicBar;
