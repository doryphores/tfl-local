import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import GlobalStyles from './GlobalStyles';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <h1>
      Hello
    </h1>
  </ThemeProvider>
);

export default App;
