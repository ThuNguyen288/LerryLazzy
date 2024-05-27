import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you have a function named `reportWebVitals`, make sure it's imported and called correctly.
// Otherwise, remove this line.
reportWebVitals();
