import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';

// Load SCSS
import '../scss/app.scss';

// Render DOM
ReactDOM.render(
  <App />,
  document.getElementById('hooperApp')
);