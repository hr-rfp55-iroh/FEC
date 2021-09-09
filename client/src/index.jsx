import React from 'react';
import ReactDOM from 'react-dom';
import config from '../../config.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest(event, method, route, callback) {
    method = method || 'get';
    route = route || 'products';

    var options = {
      method: method,
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/${route}`,
      headers: {'Authorization': config.API_TOKEN}
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

  render() {
    return (
      <h1 onClick={this.sendRequest}>Hello World</h1>
    );
  }

  // HTTP requests
  // API requests
}

ReactDOM.render(<App />, document.getElementById('app'));