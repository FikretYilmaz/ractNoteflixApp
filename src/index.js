import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { NoteContextProvider } from './context/noteContext';
import { GenreContext, GenreProvider } from './context/GenreContext';

ReactDOM.render(
  <React.StrictMode>
    {/* <GenreProvider> */}
    <NoteContextProvider>
      <Router>
        <App />
      </Router>
    </NoteContextProvider>
    {/* </GenreProvider> */}
  </React.StrictMode>,
  document.getElementById('root'),
);
