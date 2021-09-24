import React, { useContext } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

import { GlobalContext } from './GlobalContext';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    font-family: 'Poppins', sans-serif;
  }
`;

const Layout = ({ children }) => {
  const darkTheme = {
    background: '#9c091f',
    backgroundPOInfoPnl: '#344a3a',
    pageBackgroundImage: 'linear-gradient(#516e59, #1f261e 20%, #181f17)',
    poTextBackgroundImage: 'linear-gradient(#181f17, #516e59 50%, #1f261e 90%, #181f17 100%)',
    bannerBackgroundImage: 'linear-gradient(#520c02,#8e93a1, #324a33)',
    questionHeaderBackground: '#1f261e',
    starRatingBackground: 'linear-gradient(#181f17, #516e59 10%)',
    backgroundSlider: '#1f261e',
    text: '#dfe8e1',
  };

  const lightTheme = {
    background: 'white',
    backgroundPOInfoPnl: 'rgb(245, 250, 243)',
    pageBackgroundImage: 'linear-gradient(white, rgb(248, 251, 247))',
    poTextBackgroundImage: 'linear-gradient(rgb(187, 207, 182),rgb(248, 251, 247) 10%, #f8fbf7 90%, rgb(187, 207, 182) 100%)',
    bannerBackgroundImage: 'linear-gradient(#DFBC8D,rgb(248, 251, 247), rgb(187, 207, 182))',
    questionHeaderBackground: 'whitesmoke',
    starRatingBackground: 'transparent',
    backgroundSlider: 'rgb(187, 207, 182)',
    text: 'black',
  };

  const currentTheme = useContext(GlobalContext);

  let theme;
  switch (currentTheme.theme) {
    case 'dark':
      theme = darkTheme;
      break;
    case 'light':
      theme = lightTheme;
      break;
    default:
      theme = lightTheme;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
