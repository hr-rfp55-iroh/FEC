const express = require('express');
const qa = require('./helpers/QA/questions.js');
const path = require('path');
const config = require(path.join('./../', 'config.js'));

// console.log(config.API_TOKEN)
const options = {
  method: 'get',
  headers: { Authorization: config.API_TOKEN },
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

app.get('/qa/questions', (req, res) => {
  if (req) {
    qa.getQforProduct(options, (err, data) => {
      if (err) {
        console.log(err.response, 'err from app.get');
        res.status(418).send('err from app.get', err.data);
      } else {
        console.log(data, 'data');
        res.status(200).send(data);
      }
    });
  }
});

module.exports = app;
