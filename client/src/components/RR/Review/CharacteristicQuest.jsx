import React from 'react';
import PropTypes from 'prop-types';

const CharacteristicsQuest = (props) => {
  const { charc } = props;
  return (
    <div>{charc}</div>
  );
};

CharacteristicsQuest.propTypes = {
  charc: PropTypes.string,
};

CharacteristicsQuest.defaultProps = {
  charc: '',
};

export default CharacteristicsQuest;
