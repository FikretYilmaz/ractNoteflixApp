import { ArrowDropDown, Notifications, Search } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';

const Navbar = () => {
  const [isScrolled, setItScrolled] = useState(false);
  window.onscroll = () => {
    setItScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
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
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>

          <span>New and Popular</span>

          <span>My List</span>
          <span>My Notes</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
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
