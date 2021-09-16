import React from 'react';
import PropTypes from 'prop-types';
import ReviewStarRating from './ReviewStarRating';

const charcsSelections = {
  Size: {
    1: 'A size too small', 2: 'Half a size too small', 3: 'Perfect', 4: 'Half a size too big', 5: 'A size too big',
  },
  Width: {
    1: 'Too narrow', 2: 'Slightly narrow', 3: 'Perfect', 4: 'Slightly wide', 5: 'Too wide',
  },
  Comfort: {
    1: 'Uncomfortable', 2: 'Slightly uncomfortable', 3: 'Ok', 4: 'Comfortable', 5: 'Perfect',
  },
  Quality: {
    1: 'Poor', 2: 'Below average', 3: 'What I expected', 4: 'Pretty great', 5: 'Perfect',
  },
  Length: {
    1: 'Runs short', 2: 'Runs slightly short', 3: 'Perfect', 4: 'Runs slightly long', 5: 'Runs long',
  },
  Fit: {
    1: 'Runs tight', 2: 'Runs slightly tight', 3: 'Perfect', 4: 'Runs slightly loose', 5: 'Runs loose',
  },
};

const ReviewCharacteristics = (props) => {
  const { charc, name } = props;
  const selections = charcsSelections[charc];
  return (
    <div>
      <div>{charc}</div>
      <ReviewStarRating name={name} selections={selections} />
      <div className="star" />
    </div>
  );
};

ReviewCharacteristics.propTypes = {
  charc: PropTypes.string,
  name: PropTypes.string,
};

ReviewCharacteristics.defaultProps = {
  charc: '',
  name: '',
};

export default ReviewCharacteristics;
