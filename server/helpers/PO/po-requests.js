const axios = require('axios');

const getProductById = (id, options, callback) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`;

  axios.get(url, options)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const getStylesById = (id, options, callback) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`;

  axios.get(url, options)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = { getProductById, getStylesById };
