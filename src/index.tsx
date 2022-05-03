import React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import App from './app';

import customTheme from './styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
