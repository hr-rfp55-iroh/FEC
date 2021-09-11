const axios = require('axios');
const path = require('path');
const API_TOKEN = require(path.join('../../../', 'config.js'));

// GET /qa/questions
// Retrieves a list of questions for a particular product.
// This list does not include any reported questions.

const getQforProduct = (callback) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions')
    .then((results) => console.log(results))
    .catch((error) => console.log(error));
};

module.exports = { getQforProduct, }