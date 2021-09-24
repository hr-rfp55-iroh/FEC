import React, { useState } from 'react';

export const GlobalContext = React.createContext({
  currTheme: '',
  switchTheme: () => {},
});

const GlobalContextProvider = (props) => {
  const [currTheme, setCurrTheme] = useState(
    window.localStorage.getItem('theme') === null
      ? 'light'
      : window.localStorage.getItem('theme'),
  );

  const switchTheme = (themeType) => {
    setCurrTheme(themeType);
  };
  const { children } = props;
  return (
    <GlobalContext.Provider
      value={{
        theme: currTheme,
        switchTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
