import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import app from './state/reducers';

import { injectGlobal } from 'emotion';
import { blue } from './theme';

const store = createStore(app);

injectGlobal`
  body {
    background-color: ${blue};
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
