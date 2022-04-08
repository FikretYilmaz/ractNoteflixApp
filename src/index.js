import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { NoteContextProvider } from './context/noteContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NoteContextProvider>
        <Router>
          <App />
        </Router>
      </NoteContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
