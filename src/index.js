import React from 'react';
import { createRoot } from 'react-dom/client';  // Change here
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Use the new root API if you're using React 18+
const container = document.getElementById('root');
const root = createRoot(container);  // Create a root.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
