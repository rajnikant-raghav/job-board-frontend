import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={() => navigate('/')}>
          <h1>JobBoard</h1>
        </div>

        {/* Navigation Menu */}
        <nav className={`header-nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <button 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => navigate('/')}
              >
                Home
              </button>
            </li>
           
            
            <li className="nav-item">
              <button 
                className={`nav-link ${isActive('/create-job') ? 'active' : ''}`}
                onClick={() => navigate('/create-job')}
              >
                Post a Job
              </button>
            </li>
           
          </ul>
        </nav>

        {/* User Menu */}
        <div className="header-user">
          {/* <div className="user-menu-container">
            <button 
              className="user-menu-button"
              onClick={toggleUserMenu}
            >
              <span className="user-avatar">👤</span>
              <span className="user-name">John Doe</span>
              <span className="dropdown-arrow">▼</span>
            </button> */}
            
            {/* {isUserMenuOpen && (
              <div className="user-dropdown">
                <a href="/profile" className="dropdown-item">Profile</a>
                <a href="/applications" className="dropdown-item">My Applications</a>
                <a href="/saved-jobs" className="dropdown-item">Saved Jobs</a>
                <a href="/settings" className="dropdown-item">Settings</a>
                <hr className="dropdown-divider" />
                <a href="/logout" className="dropdown-item logout">Logout</a>
              </div>
            )} */}
          {/* </div> */}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-button ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
