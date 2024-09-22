import React, { useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../cart/CartContext';
import './MedicamentList.scss';

const MedicamentList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [medicaments, setMedicaments] = useState([]);
  const [quantities, setQuantities] = useState({});
  
  React.useEffect(() => {
    fetch(`http://localhost:3333/${id}/medicaments`)
      .then((response) => response.json())
      .then((data) => setMedicaments(Array.isArray(data) ? data : []))
      .catch((error) => console.error('Error fetching medications:', error));
  }, [id]);

  const handleQuantityChange = (medicamentId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [medicamentId]: quantity,
    }));
  };

  const handleAddToCart = (medicament) => {
    const quantity = quantities[medicament.id] || 1;
    addToCart({ ...medicament, quantity });
    navigate('/panier', { state: { id } });

  };

  return (
    <div className="medicaments-interface">
       
      <h1>Medicaments for labo: {id}</h1>

      <section className="medicaments-section">
        <table className="medicaments-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicaments.length > 0 ? (
              medicaments.map((medicament) => (
                <tr key={medicament.id}>
                  <td>{medicament.name}</td>
                  <td>{medicament.description}</td>
                  <td>{medicament.price} DH</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={quantities[medicament.id] || 1}
                      onChange={(e) => handleQuantityChange(medicament.id, parseInt(e.target.value))}
                      className="quantity-input"
                    />
                  </td>
                  <td>
                    <button onClick={() => handleAddToCart(medicament)}>
                    Add to cart
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Aucun médicament trouvé pour ce laboratoire.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
    
  );
};

export default MedicamentList;
