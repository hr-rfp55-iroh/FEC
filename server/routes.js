const express = require('express');
const qa = require('./helpers/QA/questions.js');
const path = require('path');
const config = require(path.join('./../', 'config.js'));

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
    let { product_id } = req.query;
    qa.getQforProduct(product_id, options, (err, data) => {
      if (err) {
        res.status(418).send('err from app.get');
      } else {
        console.log('successful questions request');
        res.status(200).send(data);
      }
    });
  }
});

module.exports = app;
