import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../components/context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    logout(); 
    navigate('/home'); 
  };

  return (
    <div className="logout-page">
      <h2>Deconection...</h2>
    </div>
  );
};

export default Logout;
