import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACtSq03cYY5WJq-KvjahLGmp7of5n_Sd0&language=rs&libraries=places"></script>