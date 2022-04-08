import './app.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import React, { useContext } from 'react';
import MyNotesList from './pages/myNotesList/MyNotesList';
import { authContext } from './context/authContext';

const App = () => {
  const { user } = useContext(authContext);
  // const user = false;
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/register" />}
      ></Route>
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      ></Route>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      ></Route>
      {user && (
        <React.Fragment>
          <Route path="/movies" element={<Home type="movies" />}></Route>
          <Route path="/series" element={<Home type="series" />}></Route>
          <Route path="/search" element={<Home type="search" />}></Route>
          <Route path="/myNotes" element={<MyNotesList />}></Route>
          <Route path="/watch/:trailerKey" element={<Watch />}></Route>
        </React.Fragment>
      )}
    </Routes>
  );
};

export default App;
