import React from 'react';
import axios from 'axios';
import StarRating from './StarRating';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.getProductInfo = this.getProductInfo.bind(this);

    this.state = {

    };
  }

  componentDidMount() {
    this.getProductInfo();
  }

  getProductInfo() {
    const { selected } = this.props;
    axios.get(`/po/info/${selected}`)
      .then((results) => {
        console.log('successful axios request', results.data);
      });
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
