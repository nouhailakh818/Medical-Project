import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateMedicament.scss';
import { FaTimes } from "react-icons/fa";

const UpdateMedicament = ({ medicament, onClose, refreshMedicaments }) => {
  const [name, setName] = useState(medicament.name);
  const [description, setDescription] = useState(medicament.description);
  const [price, setPrice] = useState(medicament.price);
  const [quantity, setQuantity] = useState(medicament.quantity);
  const [expirationDate, setExpirationDate] = useState(medicament.expiration_date);

  useEffect(() => {
    if (medicament) {
      setName(medicament.name);
      setDescription(medicament.description);
      setPrice(medicament.price);
      setQuantity(medicament.quantity);
      setExpirationDate(medicament.expiration_date);
    }
  }, [medicament]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3333/medicament/${medicament.id}`, {
        name,
        description,
        price,
        quantity,
        expiration_date: expirationDate,
      });
      refreshMedicaments();
      onClose(); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour du médicament :', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="update-form-header">
        <h2>Update Medicament</h2>
        <FaTimes onClick={onClose} className="close-icon" />
        </div>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          
          <label>Description</label>
          <input value={description}
          onChange={(e) => setDescription(e.target.value)} />

          <label>Price</label>
          <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="5" 
            />
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

          <label>Expiration Date</label>
          <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />

          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMedicament;
