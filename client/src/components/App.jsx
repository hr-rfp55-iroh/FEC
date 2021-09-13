import React from 'react';
import axios from 'axios';
import config from '../../../config';

import Overview from './PO/Overview';
import RatingReview from './RR/RatingReview';
import Form from './QA/Form';
import Unit from './QA/Unit';

class App extends React.Component {
  constructor(props) {
    super(props);

    // currentProduct is the product_id of the currently selected product.
    this.state = {
      currentProduct: 40344,
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
          isProductsLoaded: true,
        });
        const { products } = this.state;
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isProductsLoaded: false,
        });
      });
  }
  // Q&A HTTP requests

  // R&R HTTP requests

  render() {
    const { products, currentProduct, isProductsLoaded } = this.state;
    return (
      <div>
        <h1>Hello World!</h1>
        <button type="submit" onClick={this.readProduct} onKeyPress={this.readProduct}>A button</button>
        <div id="PO">
          <Overview selected={currentProduct} />
        </div>
        <div id="RR">
          <RatingReview />
        </div>
        {isProductsLoaded ? (
          <div id="QA">
            <Form />
            <Unit products={products} currentProduct={currentProduct} />
          </div>
        ) : ''}
      </div>
    );
  }
}

export default App;
