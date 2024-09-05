import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Effectuer la déconnexion
    handleLogout();
  }, []);

  const handleLogout = () => {
    // Effacer les données d'authentification (par exemple, token JWT)
    localStorage.removeItem('token'); // ou tout autre clé utilisée pour stocker les données d'authentification

    // Rediriger l'utilisateur vers la page de connexion ou d'accueil
    navigate('/login'); // ou '/' pour rediriger vers la page d'accueil
  };

  return (
    <div className="logout-page">
      <h2>Déconnexion en cours...</h2>
    </div>
  );
};

export default Logout;
