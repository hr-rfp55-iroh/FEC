const axios = require('axios');

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

const getReviews = (options, callback) => {
  axios.get(`${url}/reviews/`, options)
    .then((response) => {
      callback(null, response.data.results);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = {
  getReviews,
};
