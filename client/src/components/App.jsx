import React from 'react';
import axios from 'axios';
import config from '../../../config';

import ProductOverview from './PO/ProductOverview';
import RatingReview from './RR/RatingReview';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: ['test'],
      // reviews: [],
      // questions: [],
      // cart: []
    };
    this.readProduct = this.readProduct.bind(this);
  }

  componentDidMount() {
    this.readProduct();
  }
  // Product Info HTTP requests

  readProduct() {
    const options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
      headers: { Authorization: config.API_TOKEN },
    };

    axios(options)
      .then((response) => {
        this.setState({
          products: response.data,
        });
        const { products } = this.state;
        console.log(products);
      })
      .catch((err) => console.log(err));
  }
  // Q&A HTTP requests

  // R&R HTTP requests

  render() {
    // const { products } = this.state;
    return (
      <div>
        <h1>Hello World!</h1>
        <button type="submit" onClick={this.readProduct} onKeyPress={this.readProduct}>A button</button>
        <div id="PO">
          <ProductOverview />
        </div>
        <div id="RR">
          <RatingReview />
        </div>
      </div>
    );
  }
}

export default App;
