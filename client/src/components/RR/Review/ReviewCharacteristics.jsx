import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const ReviewStarRating = lazy(() => import('./ReviewStarRating'));

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
  const { charc, name, handleChange } = props;
  const selections = charcsSelections[charc];
  return (
    <div>
      <div>{charc}</div>
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewStarRating name={name} selections={selections} handleChange={handleChange} />
      </Suspense>
      <div className="star" />
    </div>
  );
};

ReviewCharacteristics.propTypes = {
  charc: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
};

ReviewCharacteristics.defaultProps = {
  charc: '',
  name: '',
  handleChange: () => {},
};

export default ReviewCharacteristics;
