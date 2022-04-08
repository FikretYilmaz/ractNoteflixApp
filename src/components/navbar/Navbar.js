import { ArrowDropDown, Notifications, Search } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';

const Navbar = ({ searchTerm, setSearchTerm, setMyNotes }) => {
  const [isScrolled, setItScrolled] = useState(false);
  window.onscroll = () => {
    setItScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className="container">
        <div className="left">
          <img src="../../img/main-logo.png" alt="notefilm-Logo" />
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          <Link to="/series" className="link">
            <span className="mainNavbarLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="mainNavbarLinks">Movies</span>
          </Link>
          {/* 
          <Link to="/search" className="link">
            <span className="mainNavbarLinks">Search</span>
          </Link> */}
          <Link to="/myNotes" className="link">
            <span className="mainNavbarLinks">My Notes</span>
          </Link>
        </div>
        <div className="right">
          <span className="icon inputContainer" id="">
            <form onSubmit={handleOnSubmit}>
              <input
                type="text"
                placeholder="Search..."
                id="input"
                value={searchTerm}
                onChange={handleOnChange}
              ></input>
              <Search id="inputIcon" />
            </form>
          </span>

          <Notifications className="icon" />
          <img
            src="https://thumbs.dreamstime.com/b/tiger-mascot-gaming-character-logo-vector-tiger-mascot-gaming-character-logo-220769949.jpg"
            alt="user-logo"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Setting</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
