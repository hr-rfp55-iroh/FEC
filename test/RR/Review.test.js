import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, fireEvent, waitFor, screen, within,
} from '@testing-library/react';
import RatingReview from '../../client/src/components/RR/RatingReview';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';


const reviews = [
  {
    review_id: 841092,
    rating: 5,
    summary: 'Very good',
    recommend: true,
    response: null,
    body: 'lorem ipsum',
    date: '2021-09-17T00:00:00.000Z',
    reviewer_name: 'tester',
    helpfulness: 5,
    photos: [],
  },
  {
    review_id: 841091,
    rating: 5,
    summary: 'OK',
    recommend: true,
    response: null,
    body: 'lorem ipsum',
    date: '2021-09-17T00:00:00.000Z',
    reviewer_name: 'tester',
    helpfulness: 3,
    photos: [],
  },
  {
    review_id: 841127,
    rating: 5,
    summary: 'Bad',
    recommend: true,
    response: null,
    body: 'lorem ipsum',
    date: '2021-09-17T00:00:00.000Z',
    reviewer_name: 'tester',
    helpfulness: 0,
    photos: [],
  },
  {
    review_id: 841126,
    rating: 5,
    summary: 'Very bad',
    recommend: true,
    response: null,
    body: 'lorem ipsum',
    date: '2021-09-17T00:00:00.000Z',
    reviewer_name: 'tester',
    helpfulness: 0,
    photos: [],
  }];

const characterestics = {
  product_id: '40344',
  ratings: {
    1: '4',
    2: '5',
    3: '8',
    4: '16',
    5: '79',
  },
  recommended: {
    false: '18',
    true: '94',
  },
  characteristics: {
    Fit: {
      id: 135219,
      value: '2.1052631578947368',
    },
    Length: {
      id: 135220,
      value: '2.1052631578947368',
    },
    Comfort: {
      id: 135221,
      value: '2.4736842105263158',
    },
    Quality: {
      id: 135222,
      value: '2.4736842105263158',
    },
  },
};

const server = setupServer(
  rest.get('/reviews/', (req, res, ctx) => (res(ctx.json(reviews)))),
  rest.get('/reviews/meta/', (req, res, ctx) => (res(ctx.json(characterestics)))),
);
describe('Test Ratings & Reviews widget', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('loads and displays rating summary', async () => {
    render(<RatingReview />);
    await waitFor(() => (screen.getByRole('button', { name: 'MORE REVIEWS' })));
    expect(screen.getByTestId('rating-avg')).toHaveTextContent('4.4');
    expect(screen.getByTestId('rec-rate')).toHaveTextContent('84% of reviews recommend this product');
  });

  it('loads and displays review list', async () => {
    render(<RatingReview />);
    await waitFor(() => (screen.getByRole('button', { name: 'MORE REVIEWS' })));
    expect(screen.getByLabelText('Sort on')).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Relevant' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Helpful' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Newest' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'ALL REVIEWS' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'ADD A REVIEW' })).toBeTruthy();
    expect(screen.getAllByTestId('review-tile').length).toBe(2);
  });
});
