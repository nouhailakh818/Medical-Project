import React from 'react';
import { Link } from 'react-router-dom';
import './User.scss';

const User = () => {
  const [laboratories, setLaboratories] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3333/laboratoires')
      .then((response) => response.json())
      .then((data) => setLaboratories(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching laboratories:', error));
  }, []);

  return (
    <div className="labo-interface">
      <header className="hero-section">
        <h1>À vous de choisir votre laboratoire</h1>
        <p>Explorez nos laboratoires pour toutes vos recherches scientifiques.</p>
        <div className="cta-buttons">
          <button>Accéder aux laboratoires</button>
        </div>
      </header>
      <section className="labs-section">
        <div className="labs-grid">
          {laboratories.length > 0 ? (
            laboratories.map((lab, index) => (
<Link key={index} to={`/laboratoires/${lab.id}/categories`} className="lab-card-link">
       <div className="lab-card" style={{ backgroundImage: `url(http://localhost:3333/${lab.image})` }}>
                  <div className="overlay">
                    <h2>{lab.name}</h2>
                    <p>{lab.description}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Loading laboratories...</p>
          )}
          
        </div>
      </section>
    </div>
  );
};

export default User;
