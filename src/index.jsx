import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';
import English from './lang/en.json';

// When adding more languages a `const locale = navigator?.locale || 'en'` must be added.
// As well, a switch for choosing the lang obj values must be performed based in the calculated locale.
// Default to 'English'.
// for the sake of this assignment, only English is used.
const lang = English;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale="en" messages={lang}>
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
