const axios = require('axios');

const config = require('../../../config');

const headers = { Authorization: config.API_TOKEN };

// GET /qa/questions
// Retrieves a list of questions for a particular product.
// This list does not include any reported questions.

const getQforProduct = (req, options, callback) => {
  // TODO : include params for page and count of questions returned
  const { product_id } = req;
  axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${product_id}`, options)
    .then((results) => callback(null, results.data))
    .catch((error) => callback(error));
};

const getAforProduct = (req, options, callback) => {
  const { product_id, question_id } = req;
  axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${product_id}&question_id=${question_id}/answers`, options)
    .then((results) => callback(null, results.data.results))
    .catch((error) => callback(error));
};

const postQforProduct = (req, callback) => {
  const {
    body, email, name, product_id,
  } = req.body;
  const obj = {
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/',
    headers,
    data: {
      body, email, name, product_id,
    },
    method: 'POST',
  };
  axios(obj)
    .then((results) => callback(null, results))
    .catch((error) => callback(error));
};

const postAforProduct = (req, callback) => {
  const {
    body, email, name, question_id, photos,
  } = req.body;
  const obj = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question_id}/answers`,
    headers,
    data: {
      question_id, body, email, name, photos,
    },
    method: 'POST',
  };
  axios(obj)
    .then((results) => callback(null, results))
    .catch((error) => callback(error));
};

const markQasHelpful = (req, callback) => {
  const { question_id } = req.body;
  const obj = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question_id}/helpful`,
    headers,
    method: 'PUT',
  };
  axios(obj)
    .then((results) => callback(null, results))
    .catch((error) => callback(error));
};

module.exports = { getQforProduct, getAforProduct, postQforProduct, postAforProduct, markQasHelpful };
