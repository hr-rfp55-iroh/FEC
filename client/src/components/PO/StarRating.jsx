import React from 'react';

class StarRating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div id="star-rating-overview">
        <div>
          <img src="./static/empty-star.svg" height="14" alt="star system" />
          <img src="./static/star-one-quarter.svg" height="14" alt="star system" />
          <img src="./static/star-half.svg" height="14" alt="star system" />
          <img src="./static/star-three-quarter.svg" height="14" alt="star system" />
          <img src="./static/solid-star.svg" height="14" alt="star system" />
        </div>
        <a href="/">Read all reviews</a>
      </div>
    );
  }
}

export default StarRating;
