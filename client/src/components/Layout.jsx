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
    backgroundPOInfoPnl: '#516e59',
    pageBackgroundImage: 'linear-gradient(#516e59, #1f261e 20%, #181f17)',
    poTextBackgroundImage: 'linear-gradient(#181f17, #516e59 50%, #1f261e 100%, #181f17 100%)',
    pageBoxShadow: '0px 0px 10px black',
    bannerBackgroundImage: 'linear-gradient(#520c02,#8e93a1, #324a33)',
    text: '#ffffff',
    secondaryText: '#8e93a1',
    footerText: '#c8c9cc',
    button: '#9c091f',
  };

  const lightTheme = {
    background: 'white',
    backgroundPOInfoPnl: 'rgb(245, 250, 243)',
    pageBackgroundImage: 'linear-gradient(white, rgb(248, 251, 247))',
    poTextBackgroundImage: 'linear-gradient(rgb(187, 207, 182),rgb(248, 251, 247) 10%, #f8fbf7 90%, rgb(187, 207, 182) 100%)',
    pageBoxShadow: '0px 0px 10px rgb(208, 226, 203)',
    bannerBackgroundImage: 'linear-gradient(#DFBC8D,rgb(248, 251, 247), rgb(187, 207, 182))',
    text: 'light',
    secondaryText: '',
    footerText: '#939496',
    button: '#228f2d',
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
