import React, { useState, useContext } from 'react';
import { FaUserShield } from "react-icons/fa";
import { AiOutlineSwapRight } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import "./Log.scss";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AuthContext from '../../components/context/AuthContext';

const Log = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login } = useContext(AuthContext); 
  const notify = () => toast.error('Login failed. Please check your credentials.');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/api/auth/signin', {
        email,
        password,
      });

      const token = response.data.accessToken;
      const roles = response.data.roles;

      console.log(roles)
      login(token, roles[0]);

      if (roles.includes("ROLE_ADMIN")) {
        navigate("/medicament");
      } else if (roles.includes("ROLE_USER")) {
        navigate("/users");
      } else if (roles.includes("ROLE_MODERATOR")) {
        navigate("/moderator");
      }
    } catch (err) {
      notify();
      console.error(err);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const noSpaces = !/\s/.test(email);
    
    return emailRegex.test(email) && noSpaces;
  };

  const validatePassword = (password) => {
    const lengthValid = password.length >= 6;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const numberValid = /[0-9]/.test(password);

    return lengthValid && uppercaseValid && lowercaseValid && numberValid;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError(
        "Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, and a number"
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className='loginPage flex'>
      <div className='container flex'>
        <div className='imageDiv'>
          <div className='mediSideImage' alt=""></div>
        </div>
        <div className='formDiv flex'>
          <div className='headerDiv'>
            <h3>Welcome Back!</h3>
          </div>

          <form className='form grid' onSubmit={handleLogin}>
            <div className='inputDiv'>
              <div className='input flex'>
                <FaUserShield className='icon' />
                <input
                  type="email"
                  placeholder='Enter your email'
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              {emailError && <span className='error'>{emailError}</span>}
            </div>

            <div className='inputDiv'>
              <div className='input flex'>
                <BsFillShieldLockFill className='icon' />
                <input
                  type="password"
                  placeholder='Enter your password'
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              {passwordError && <span className='error'>{passwordError}</span>}
            </div>

            <button type='submit' className='btn flex'>
              Log In
              <AiOutlineSwapRight className='icon' />
              <Toaster />
            </button>

            <div className='footerDiv flex'>
              <span className='text'>Don't have an account?</span>
              <Link to='/sign' className='btnSig'>
                Sign Up
              </Link>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Log;
