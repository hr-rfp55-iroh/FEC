import React from 'react';

class StarRating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <img src="./static/empty-star.svg" alt="star system" />
        <img src="./static/star-one-quarter.svg" alt="star system" />
        <img src="./static/star-half.svg" alt="star system" />
        <img src="./static/star-three-quarter.svg" alt="star system" />
        <img src="./static/solid-star.svg" alt="star system" />
      </div>
    );
  }
}

export default StarRating;
