const axios = require('axios');
const config = require('../../../config');

const headers = { Authorization: config.API_TOKEN };

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
  console.log('from post q for product', obj);
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

const reportQ = (req, callback) => {
  const { question_id } = req.body;
  const obj = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question_id}/report`,
    headers,
    method: 'PUT',
  };
  axios(obj)
    .then((results) => callback(null, results))
    .catch((error) => callback(error));
};

const markAnsAsHelpful = (req, callback) => {
  const { answer_id } = req.body;
  const obj = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer_id}/helpful`,
    headers,
    method: 'PUT',
  };
  axios(obj)
    .then((results) => callback(null, results))
    .catch((error) => callback(error));
};

const reportAnswer = (req, callback) => {
  const { answer_id } = req.body;
  const obj = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer_id}/report`,
    headers,
    method: 'PUT',
  };
  axios(obj)
    .then((results) => callback(null, results))
    .catch((error) => callback(error));
};

module.exports = {
  getQforProduct,
  getAforProduct,
  postQforProduct,
  postAforProduct,
  markQasHelpful,
  reportQ,
  markAnsAsHelpful,
  reportAnswer,
};
