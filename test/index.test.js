import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from '../client/src/components/App.jsx';

afterEach(cleanup);

it('App exists', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App />, div
  );
  console.log('hello');
  // expect(readProduct).toBeTruthy();
})