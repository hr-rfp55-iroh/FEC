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

const postReview = (options, data, callback) => {
  axios.post(`${url}/reviews`, data, options)
    .then(() => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = {
  getReviews,
  postReview,
};
