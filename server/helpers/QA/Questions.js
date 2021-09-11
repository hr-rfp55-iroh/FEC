const axios = require('axios');
// const path = require('path');
// const config = require(path.join('../../../', 'config.js'));

// // console.log(config.API_TOKEN)
// const options = {
//   method: 'get',
//   headers: { Authorization: config.API_TOKEN },
// };

// GET /qa/questions
// Retrieves a list of questions for a particular product.
// This list does not include any reported questions.

const getQforProduct = (options, callback) => {
  axios('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', options)
    .then((results) => console.log(results))
    .then((results) => callback(null, results))
    .catch((error) => callback(error));
};

module.exports = { getQforProduct };
