import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Using TypeScript version
import 'react-datepicker/dist/react-datepicker.css';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
