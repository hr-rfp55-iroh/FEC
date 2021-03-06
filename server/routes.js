const express = require('express');
const compression = require('compression');

const po = require('./helpers/PO/po-requests');
const qa = require('./helpers/QA/Questions');
const review = require('./helpers/RR/review-requests');
const rating = require('./helpers/RR/rating-requests');

const config = require('../config');

const options = {
  headers: { Authorization: config.API_TOKEN },
};

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

app.post('/click', (req, res) => {
  po.postToInteractions(req.body, (err, results) => {
    if (err) { res.status(422).send(err); } else { res.send(results); }
  });
});

app.get('/po/info/:id', (req, res) => {
  po.getProductById(req.params.id, (err, results) => {
    if (err) { res.status(404).send(err); } else { res.send(results); }
  });
});

app.get('/po/styles/:id', (req, res) => {
  po.getStylesById(req.params.id, (err, results) => {
    if (err) { res.status(404).send(err); } else { res.send(results); }
  });
});

app.get('/cart', (req, res) => {
  po.getCart((err, results) => {
    if (err) { res.status(404).send(err); } else { res.send(results); }
  });
});

app.post('/cart', (req, res) => {
  po.postToCart(req.body, (err, results) => {
    if (err) { res.status(500).send(err); } else { res.send(results); }
  });
});

// get questions for the item
app.get('/qa/questions/:product_id', (req, res) => {
  if (req) {
    // TODO : include params for page and count of questions returned
    // ? will need to find an example that actually returns more than one page of data
    qa.getQforProduct(req.params, req.query, options, (err, data) => {
      if (err) {
        res.status(418).send(err);
      } else {
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

// post an answer for the item
app.post('/qa/answers', (req, res) => {
  if (req) {
    qa.postAforProduct(req, (err, data) => {
      if (err) {
        res.status(418).send(err);
      } else {
        res.status(201).send(data.data);
      }
    });
  }
});

// mark question as helpful
app.put('/qa/questions/helpful', (req, res) => {
  if (req) {
    // console.log(req);
    qa.markQasHelpful(req, (err) => {
      if (err) {
        res.status(418).send(err);
      } else {
        res.status(204).send(null);
      }
    });
  }
});

// report question
app.put('/qa/questions/report', (req, res) => {
  if (req) {
    // console.log(req);
    qa.reportQ(req, (err) => {
      if (err) {
        res.status(418).send(err);
      } else {
        res.sendStatus(201);
      }
    });
  }
});
// mark answer as helpful
app.put('/qa/answers/helpful', (req, res) => {
  if (req) {
    // console.log(req);
    qa.markAnsAsHelpful(req, (err) => {
      if (err) {
        console.log(err);
        res.status(418).send(err);
      } else {
        res.status(201).send(null);
      }
    });
  }
});

// report answer
app.put('/qa/answers/report', (req, res) => {
  if (req) {
    // console.log(req);
    qa.reportAnswer(req, (err, data) => {
      if (err) {
        res.status(418).send(err);
      } else {
        res.status(204).send(data);
      }
    });
  }
});
// get reviews for a product
app.get('/reviews/', (req, res) => {
  const { product_id, sort } = req.query;
  const count = 1000;
  review.getReviews({ product_id, sort, count }, (err, data) => {
    if (err) {
      res.status(500).send(`Error getting reviews from Atelier API: ${err}`);
    } else {
      res.status(200).send(data);
    }
  });
});
// get overall rating data for a product
app.get('/reviews/meta/', (req, res) => {
  const { product_id } = req.query;
  rating.getReviewMetadata({ product_id }, (err, data) => {
    if (err) {
      res.status(500).send(`Error getting reviews from Atelier API: ${err}`);
    } else {
      res.status(200).send(data);
    }
  });
});
// post review for a product
app.post('/reviews', (req, res) => {
  review.postReview(req.body, (err) => {
    if (err) {
      res.status(500).send(`Error posting review from Atelier API: ${err}`);
    } else {
      res.status(201).send('Review posted!');
    }
  });
});
// update helpfulness rating for a review
app.put('/reviews/:review_id/helpful', (req, res) => {
  const { review_id } = req.params;
  review.putHelpful(review_id, (err) => {
    if (err) {
      res.status(500).send(`Error updating helpfulness rating from Atelier API: ${err}`);
    } else {
      res.status(200).send('Updated!');
    }
  });
});
// report a review
app.put('/reviews/:review_id/report', (req, res) => {
  const { review_id } = req.params;
  review.putReport(review_id, (err) => {
    if (err) {
      res.status(500).send(`Error updating helpfulness rating from Atelier API: ${err}`);
    } else {
      res.status(200).send('Updated!');
    }
  });
});

module.exports = app;
