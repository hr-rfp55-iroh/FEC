/* eslint-disable react/jsx-boolean-value */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */

import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen, within } from '@testing-library/react';
import Style from '../../client/src/components/PO/Style';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

describe('style widget', () => {
  beforeAll(() => {
    render(
      <Style
        selected={true}
        setStyleChanges={() => {}}
        thumb="picture.png"
        name="image"
      />,
    );
  });

  afterAll(cleanup);

  it('loads a checkmark if selected is true', async () => {
    await waitFor(() => (screen.getByAltText('checkmark')));
    expect(screen.getByAltText('checkmark')).toBeTruthy();
  });
});
