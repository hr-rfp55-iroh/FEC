const axios = require('axios');

// GET /qa/questions
// Retrieves a list of questions for a particular product.
// This list does not include any reported questions.

const getQforProduct = (req, options, callback) => {
  // TODO : include params for page and count of questions returned
  let { product_id } = req;
  axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${product_id}`, options)
    .then((results) => callback(null, results.data))
    .catch((error) => callback(error));
};

const getAforProduct = (req, options, callback) => {
  let { product_id, question_id } = req;
  axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${product_id}&question_id=${question_id}/answers`, options)
    .then((results) => callback(null, results.data.results))
    .catch((error) => callback(error));
};

const postQforProduct = (req, options, callback) => {

};

module.exports = { getQforProduct, getAforProduct };
