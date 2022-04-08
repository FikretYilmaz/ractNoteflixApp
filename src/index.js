import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { NoteContextProvider } from './context/noteContext';

ReactDOM.render(
  <React.StrictMode>
    <NoteContextProvider>
      <Router>
        <App />
      </Router>
    </NoteContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
