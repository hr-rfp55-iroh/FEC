import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import config from '../../config';
import Component from './components/Component.jsx';

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
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <h1>Hello World!</h1>
        <button type="submit" onClick={this.readProduct} onKeyPress={this.readProduct}>A button</button>
        <Component products={products} />
      </div>
    );
  }

  // HTTP requests
  // API requests
}

ReactDOM.render(<App />, document.getElementById('app'));
