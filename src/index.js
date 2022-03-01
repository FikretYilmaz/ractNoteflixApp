import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { GenreContext, GenreProvider } from './context/GenreContext';

ReactDOM.render(
  <React.StrictMode>
    {/* <GenreProvider> */}
    <Router>
      <App />
    </Router>
    {/* </GenreProvider> */}
  </React.StrictMode>,
  document.getElementById('root'),
);
