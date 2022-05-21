import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './stores'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';
import "./i18n.ts"
import './icons';

const root = ReactDOM.createRoot(
  (document.getElementById('root') as HTMLElement)
);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);


