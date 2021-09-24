import React, { useContext } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

import { GlobalContext } from './GlobalContext';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    text-decoration: none;
  }

  body {
    font-family: Arial;
    background: ${(props) => props.theme.background};
  }
`;

const Layout = ({ children }) => {
  const darkTheme = {
    background: '#9c091f',
    secondaryBackground: '#141b9c',
    text: '#9c091f',
    button: '#9c091f',
  };

  const lightTheme = {
    background: '#228f2d',
    secondaryBackground: '#f55442',
    text: '#228f2d',
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
