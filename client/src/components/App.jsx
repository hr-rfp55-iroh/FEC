import React from 'react';
import axios from 'axios';
import config from '../../../config';

import Overview from './PO/Overview';
// import Navbar from './PO/Navbar';
import RatingReview from './RR/RatingReview';
import Unit from './QA/Unit';

class App extends React.Component {
  constructor(props) {
    super(props);

    // currentProduct is the product_id of the currently selected product.
    this.state = {
      currentProduct: 40344,
      products: [],
      rating: null,
    };

    this.readProduct = this.readProduct.bind(this);

    // NAVBAR
    this.incrementProduct = this.incrementProduct.bind(this);
    this.decrementProduct = this.decrementProduct.bind(this);

    // RR
    this.updateAvgRating = this.updateAvgRating.bind(this);
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
    const add = currentProduct === 40344 ? 0 : 1;

    this.setState({
      currentProduct: currentProduct - add,
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

  // RR
  // Update product rating in state to pass it to Product Overview
  updateAvgRating(num) {
    this.setState({
      rating: num,
    });
  }

  render() {
    const {
      rating, products, currentProduct, isProductsLoaded,
    } = this.state;
    return (
      <div>
        {/* <div id="grocery">
          <img src="./static/grocery-bags.png" alt="grocery" />
        </div> */}
        <div className="banner">
          <img src="./static/white_lotus.png" alt="grocery" />
          <h1>White Lotus</h1>
        </div>
        <div className="nav-bar">
          {currentProduct > 40344 ? (
            <div onClick={this.decrementProduct} onKeyPress={this.decrementProduct} role="presentation" id="nav-left-arrow">
              <img src="./static/left-arrow.svg" height="40px" alt="left-arrow" />
            </div>
          ) : (
            <div id="nav-left-arrow" />
          )}
          <div id="nav-text">Now Trending</div>
          <div onClick={this.incrementProduct} onKeyPress={this.incrementProduct} role="presentation" id="nav-right-arrow">
            <img src="./static/right-arrow.svg" height="40px" alt="right-arrow" />
          </div>
        </div>
        {/* <Navbar next={this.incrementProduct} previous={this.decrementProduct} /> */}
        <div id="PO">
          <Overview selected={currentProduct} rating={rating} />
        </div>
        {isProductsLoaded ? (
          <div id="QA">
            <div id="QA-header">
              <img src="./static/qa.svg" height="40px" alt="right-arrow" />
              &nbsp;
              <div>HAVE QUESTIONS?</div>
            </div>
            <Unit products={products} currentProduct={currentProduct} />
          </div>
        ) : ''}
        <div id="RR">
          <div id="RR-header">
            <div>REVIEWS</div>
          </div>
          <RatingReview selected={currentProduct} updateAvgRating={this.updateAvgRating} />
        </div>
      </div>
    );
  }
}

export default App;
