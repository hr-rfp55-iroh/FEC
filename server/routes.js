const express = require('express');
const po = require('./helpers/PO/po-requests');
const qa = require('./helpers/QA/Questions');
const review = require('./helpers/RR/review-requests');
const rating = require('./helpers/RR/rating-requests');

const config = require('../config');

const options = {
  headers: { Authorization: config.API_TOKEN },
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

app.get('/po/info/:id', (req, res) => {
  po.getProductById(req.params.id, options, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else { res.send(results); }
  });
});

app.get('/po/styles/:id', (req, res) => {
  po.getStylesById(req.params.id, options, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else { res.send(results); }
  });
});

// get questions for the item
app.get('/qa/questions', (req, res) => {
  if (req) {
    // TODO : include params for page and count of questions returned
    // ? will need to find an example that actually returns more than one page of data
    qa.getQforProduct(req.query, options, (err, data) => {
      if (err) {
        res.status(418).send(err);
      } else {
        // console.log('successful questions request');
        res.status(200).send(data);
      }
    });
  }
});

// get answers for the item
app.get('/qa/answers', (req, res) => {
  if (req) {
    qa.getAforProduct(req.query, options, (err, data) => {
      if (err) {
        res.status(418).send('err from app.get--Answers');
      } else {
        res.status(200).send(data);
      }
    });
  }
});

// post a question for the item
app.post('/qa/questions', (req, res) => {
  if (req) {
    qa.postQforProduct(req, (err, data) => {
      if (err) {
        res.status(418).send(err);
      } else {
        res.status(201).send(data.data);
      }
    });
  }
});

app.get('/reviews/', (req, res) => {
  const { product_id } = req.query;
  const { headers } = options;
  review.getReviews({ headers, params: { product_id } }, (err, data) => {
    if (err) {
      res.status(500).send(`error getting reviews from Atelier API: ${err}`);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/reviews/meta/', (req, res) => {
  const { product_id } = req.query;
  const { headers } = options;
  rating.getReviewMetadata({ headers, params: { product_id } }, (err, data) => {
    if (err) {
      res.status(500).send(`error getting reviews from Atelier API: ${err}`);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = app;
