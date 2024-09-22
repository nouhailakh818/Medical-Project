import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";
import { SlMenu } from "react-icons/sl";
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, userRole } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='header'>🍀 System Medical</div>
        <div className='icon' onClick={toggleMenu}>
          <SlMenu />
        </div>
        <div className={`links ${isOpen ? "active" : ""}`}>
          <Link className="link" to="/home"><h4>Home</h4></Link>
          <Link className="link" to="/about-us"><h4>About Us</h4></Link>

          {isAuthenticated && userRole === 'ROLE_ADMIN' && (
            <Link className="link" to="/medicament"><h4>Medicament</h4></Link>
          )}

          {isAuthenticated && userRole === 'ROLE_USER' && (
            <Link className="link" to="/panier"><h4>Cart</h4></Link>
          )}

          {isAuthenticated && userRole === 'ROLE_USER' && (
            <Link className="link" to="/articles"><h4>blog</h4></Link>
          )}
          {isAuthenticated && userRole === 'ROLE_ADMIN' && (
            <div className="blog-dropdown" 
                 onMouseEnter={toggleDropdown} 
                 onMouseLeave={toggleDropdown}>
              <h4 className='link'>   Blog</h4>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/dashboard"><h4>Dashboard List</h4></Link>
                  <Link className="dropdown-item" to="/articles"><h4>List</h4></Link>
                  <Link className="dropdown-item" to="/articles/new"><h4>Add Article</h4></Link>
                </div>
              )}
            </div>
          )}

          {isAuthenticated ? (
            <Link className="link login-btn" to="/logout"><h4>Logout</h4></Link>
          ) : (
            <>
              <Link className="link login-btn" to="/login"><h4>Login</h4></Link>
              <Link className="link signup-btn" to="/sign"><h4>Signup</h4></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
