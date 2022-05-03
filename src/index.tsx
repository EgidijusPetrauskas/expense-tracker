import React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import App from './app';

import theme from './styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
