import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import store from './store/index';
import App from './app';

import customTheme from './styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
