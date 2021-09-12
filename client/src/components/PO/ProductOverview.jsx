import React from 'react';
import StarRating from './StarRating';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        Product Overview
        <StarRating />
      </div>
    );
  }
}

export default ProductOverview;
