import React from 'react';
import axios from 'axios';
import config from '../../../config';

import Overview from './PO/Overview';
import Navbar from './PO/Navbar';
import RatingReview from './RR/RatingReview';
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

    // NAVBAR
    this.incrementProduct = this.incrementProduct.bind(this);
    this.decrementProduct = this.decrementProduct.bind(this);
  }

  componentDidMount() {
    this.readProduct();
  }

  // NAVBAR.JSX FUNCTIONS

  incrementProduct() {
    const { currentProduct } = this.state;
    this.setState({
      currentProduct: currentProduct + 1,
    });
  }

  decrementProduct() {
    const { currentProduct } = this.state;
    this.setState({
      currentProduct: currentProduct - 1,
    });
  }

  // NAVBAR CODE ENDS HERE

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
        <Navbar next={this.incrementProduct} previous={this.decrementProduct} />
        <button type="submit" onClick={this.readProduct} onKeyPress={this.readProduct}>A button</button>
        <div id="PO">
          <Overview selected={currentProduct} />
        </div>
        <div id="RR">
          <RatingReview selected={currentProduct} />
        </div>
        {isProductsLoaded ? (
          <div id="QA">
            <Unit products={products} currentProduct={currentProduct} />
          </div>
        ) : ''}
      </div>
    );
  }
}

export default App;
