import React from 'react';
import ReactDOM from 'react-dom';
import config from '../../config.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      reviews: [],
      questions: [],
      cart: []
    };

    this.readProduct = this.readProduct.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  componentDidMount() {
    this.readProduct();
  }

  sendRequest(event, method, route, callback) {
    method = method || 'get';
    route = route || 'products';

    var options = {
      method: method,
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/${route}`,
      headers: { 'Authorization': config.API_TOKEN }
    };

    axios(options)
      .then(response => {
        console.log(response);
        callback(null, response);
      })
      .catch(err => {
        console.error(err);
        callback(err, null);
      });
  }

  readProduct() {
    var options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
      headers: { 'Authorization': config.API_TOKEN }
    };

    axios(options)
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(this.state.products);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <h1 onClick={this.sendRequest}>Hello World</h1>
    );
  }

  // HTTP requests
  // API requests
}

ReactDOM.render(<App />, document.getElementById('app'));