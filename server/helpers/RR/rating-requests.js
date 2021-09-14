const axios = require('axios');

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

const getReviewMetadata = (options, callback) => {
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
