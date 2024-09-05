import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";
import { SlMenu } from "react-icons/sl";
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, userRole, token } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if(!token && !isAuthenticated) return(
    <div className='navbar'>
      <div className='container'>
        <div className='header'>🍀 System Medical</div>
        <div className='icon' onClick={toggleMenu}>
          <SlMenu />
        </div>
        <div className={`links ${isOpen ? "active" : ""}`}>
          <Link className="link" to="/home"><h4>Home</h4></Link>
          <Link className="link" to="/about-us"><h4>About Us</h4></Link>
          <Link className="link" to="/contact"><h4>Contact</h4></Link>
          <Link className="link" to="/blog"><h4>Blog</h4></Link>

            <Link className="link" to="/login"><h4>Login</h4></Link>
            <Link className='link' to="/sign"><h4>Signup</h4></Link>

        </div>
      </div>
    </div>
  );

  if (token && isAuthenticated) return (
    <div className='navbar'>
      <div className='container'>
        <div className='header'>🍀 System Medical</div>
        <div className='icon' onClick={toggleMenu}>
          <SlMenu />
        </div>
        <div className={`links ${isOpen ? "active" : ""}`}>
          <Link className="link" to="/home"><h4>Home</h4></Link>
          <Link className="link" to="/about-us"><h4>About Us</h4></Link>
          <Link className="link" to="/contact"><h4>Contact</h4></Link>

          {isAuthenticated && userRole === 'ROLE_ADMIN' && (
            <Link className="link" to="/medicament"><h4>Nos Médicaments</h4></Link>
          )}

          {isAuthenticated && userRole === 'ROLE_USER' && (
            <Link className="link" to="/panier"><h4>Panier</h4></Link>
          )}

          <Link className="link" to="/blog"><h4>Blog</h4></Link>

          {isAuthenticated ? (
            <Link className="link" to="/logout"><h4>Logout</h4></Link>
          ) : (
            <Link className='link' to="/sign"><h4>Signup</h4></Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
