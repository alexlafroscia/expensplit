import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistedApp, getPersistedState } from './state';

import { injectGlobal } from 'emotion';
import { blue } from './theme';

const store = createStore(persistedApp, getPersistedState());

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
