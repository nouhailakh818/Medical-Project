import React from 'react';
import { useParams } from 'react-router-dom';
import './MedicamentList.scss';

const MedicamentList = () => {
  const { id } = useParams();
  const [medicaments, setMedicaments] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://localhost:3333/${id}/medicament`)
      .then((response) => response.json())
      .then((data) => setMedicaments(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching medications:', error));
  }, [id]);

  return (
    <div className="medicaments-interface">
      <h1>Medications for Laboratory {id}</h1>
      <section className="medicaments-section">
        <div className="medicaments-grid">
          {medicaments.length > 0 ? (
            medicaments.map((medicament) => (
              <div key={medicament.id} className="medicament-card">
                <h2>{medicament.name}</h2>
                <p>{medicament.description}</p>
                {/* Add any other medicament details here */}
              </div>
            ))
          ) : (
            <p>No medications found for this laboratory.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MedicamentList;
