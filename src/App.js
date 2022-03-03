import './app.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import React from 'react';

const App = () => {
  const user = true;
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/register" />}
      ></Route>
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/home" />}
      ></Route>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/home" />}
      ></Route>
      {user && (
        <React.Fragment>
          <Route path="/movies" element={<Home type="movies" />}></Route>
          <Route path="/series" element={<Home type="series" />}></Route>
          <Route path="/watch/:trailerKey" element={<Watch />}></Route>
        </React.Fragment>
      )}
    </Routes>
  );
};

export default App;
