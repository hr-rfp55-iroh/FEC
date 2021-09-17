const axios = require('axios');
const config = require('../../../config');

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
const headers = { Authorization: config.API_TOKEN };

const getReviewMetadata = (params, callback) => {
  const options = {
    headers,
    params,
  };
  axios.get(`${url}/reviews/meta/`, options)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = {
  getReviewMetadata,
};
