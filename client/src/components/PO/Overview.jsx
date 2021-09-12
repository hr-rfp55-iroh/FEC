import React from 'react';
import StarRating from './StarRating';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div id="product-overview">
        <div id="po-gallery-pnl">
          <li>Image Gallery</li>
        </div>
        <div id="po-info-pnl">
          <StarRating />
          <li>Read all reviews</li>
          <li>Product Category</li>
          <li>Product Title</li>
          <li>Price</li>
          <li>Style Selector</li>
          <li>Share on Social Media</li>
        </div>
        <div id="po-overview-pnl">
          <li>Product Overview</li>
        </div>
      </div>
    );
  }
}

export default Overview;
