const axios = require('axios');
const config = require('../../../config');

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
const headers = { Authorization: config.API_TOKEN };

const getReviews = (params, callback) => {
  const options = {
    headers,
    params,
  };
  axios.get(`${url}/reviews/`, options)
    .then((response) => {
      callback(null, response.data.results);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const postReview = (data, callback) => {
  const options = {
    headers,
  };
  axios.post(`${url}/reviews`, data, options)
    .then(() => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
};

const putHelpful = (review_id, callback) => {
  const options = {
    headers,
  };
  axios.put(`${url}/reviews/${review_id}/helpful`, {}, options)
    .then(() => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
};

const putReport = (review_id, callback) => {
  const options = {
    headers,
  };
  axios.put(`${url}/reviews/${review_id}/report`, {}, options)
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
  putHelpful,
  putReport,
};
