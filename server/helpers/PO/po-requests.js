const axios = require('axios');
const config = require('../../../config');

const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
const options = { headers: { Authorization: config.API_TOKEN } };

const axiosGet = (url, callback) => {
  axios.get(url, options)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const getProductById = (id, callback) => {
  axiosGet(`${apiUrl}/products/${id}`, callback);
};

const getStylesById = (id, callback) => {
  axiosGet(`${apiUrl}/products/${id}/styles`, callback);
};

const getCart = (callback) => {
  axiosGet(`${apiUrl}/cart`, callback);
};

const postToCart = (item, callback) => {
  const url = `${apiUrl}/cart`;

  axios.post(url, item, options)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = {
  getProductById,
  getStylesById,
  getCart,
  postToCart,
};
