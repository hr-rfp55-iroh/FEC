import React from 'react';
import PropTypes from 'prop-types';

const ratingToStars = (number) => {
  const stars = [];
  let rating = number;
  for (let i = 0; i < 5; i += 1) {
    if (rating >= 0.875) {
      stars.push('solid-star');
    } else if (rating >= 0.625) {
      stars.push('star-three-quarter');
    } else if (rating >= 0.375) {
      stars.push('star-half');
    } else if (rating >= 0.125) {
      stars.push('star-one-quarter');
    } else {
      stars.push('empty-star');
    }
    rating -= 1;
  }
  return stars;
};

const keyNum = [1, 2, 3, 4, 5];

const Star = (props) => {
  const { rating, name } = props;
  const stars = ratingToStars(rating);
  return (
    <div className="avg-star-rating">
      {stars.map((fileName, index) => {
        const path = `./static/${fileName}.svg`;
        return (<img src={path} height="14" alt="star system" key={`${name}-${fileName}-${keyNum[index]}`} />);
      })}
    </div>
  );
};

Star.propTypes = {
  rating: PropTypes.number,
  name: PropTypes.string,
};

Star.defaultProps = {
  rating: 0,
  name: '',
};

export default Star;
