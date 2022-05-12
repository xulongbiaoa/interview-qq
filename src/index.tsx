import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';
import "./i18n.ts"
import './icons';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <Router>
    <App />
  </Router>


);


