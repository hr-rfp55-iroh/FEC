const axios = require('axios');

// GET /qa/questions
// Retrieves a list of questions for a particular product.
// This list does not include any reported questions.

const getQforProduct = (id, options, callback) => {
  // TODO : include params for page and count of questions returned
  axios(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${id}`, options)
    .then((results) => callback(null, results.data))
    .catch((error) => callback(error));
};

const getAforProduct = (id, options, callback) => {
  // axios()
}
module.exports = { getQforProduct };
