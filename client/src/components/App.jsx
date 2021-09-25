import React, { Suspense, lazy, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';

import Click from '../Click';

const Overview = lazy(() => import('./PO/Overview'));
const RatingReview = lazy(() => import('./RR/RatingReview'));
const Unit = lazy(() => import('./QA/Unit'));

import { GlobalContext } from './GlobalContext';

import Layout from './Layout';
import { Page, Banner, SwitchButton } from './GlobalStyle';

const App = (props) => {
  const [currentProduct, setCurrentProduct] = useState(40344);
  const [rating, setRating] = useState(null);
  const { theme, themeSwitchHandler } = useContext(GlobalContext);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const incrementProduct = () => {
    setCurrentProduct(currentProduct + 1);
  }

  const decrementProduct = () => {
    setCurrentProduct(currentProduct - 1);
  }

  const updateAvgRating = (num) => {
    setRating(num);
  }

  return (
    <Layout>
      <Page>
        <Click widget="navigation">
          <Banner>
            <div className="banner">
              <img src="./static/white_lotus.webp" alt="lotus" />
              <h1>White Lotus</h1>
            </div>
          </Banner>
          <div className="nav-bar">
            {currentProduct > 40344 ? (
              <div onClick={decrementProduct} onKeyPress={decrementProduct} role="presentation" id="nav-left-arrow">
                <img src="./static/left-arrow.svg" height="40px" alt="left-arrow" />
              </div>
            ) : (
              <div id="nav-left-arrow" />
              )}
            <div id="nav-text">Now Trending</div>
            <div onClick={incrementProduct} onKeyPress={incrementProduct} role="presentation" id="nav-right-arrow">
              <img src="./static/right-arrow.svg" height="40px" alt="right-arrow" />
            </div>
          </div>
        </Click>
        <Click widget="product overview">
          <div id="PO">
            <Suspense fallback={<div>Loading...</div>}>
              <Overview selected={currentProduct} rating={rating} />
            </Suspense>
          </div>
        </Click>
        <Click widget="questions and answers">
          <div id="QA">
            <div id="QA-header">
              <img src="./static/qa.svg" height="40px" alt="right-arrow" />
              &nbsp;
              <div>HAVE QUESTIONS?</div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Unit currentProduct={currentProduct} />
            </Suspense>
          </div>
        </Click>
        <Click widget="ratings and reviews">
          <div id="RR">
            <div id="RR-header">
              REVIEWS
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <RatingReview selected={currentProduct} updateAvgRating={updateAvgRating} />
            </Suspense>
          </div>
        </Click>
        <SwitchButton>
          .
          <input
            id="switch-btn"
            type='checkbox'
            onChange={() => {
              themeSwitchHandler(theme === "dark" ? "light" : "dark");
            }}
            />
          <span id="slider-round"></span>
        </SwitchButton>
      </Page>
    </Layout>
  );
};

export default App;
