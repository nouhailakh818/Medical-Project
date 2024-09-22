import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import './AddMedicament.scss';

const AddMedicament = ({ open, onClose, refreshMedicaments }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [type, settype] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/medicament', {
        name,
        description,
        price,
        quantity,
        expiration_date: expirationDate,
        type
      });
      onClose(); 
      refreshMedicaments(); 
    } catch (error) {
      console.error('Error adding medicament:', error);
    }
  };

  return (
    <Popup open={open} onClose={onClose} modal className="popup-container">
      <div className="popup-content">
        <h2>Add New Medicament</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>Description:
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>Price:
          <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="5" 
            />
          </label>
          <label>Quantity:
            <input
              type='number'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </label>
          <label>Expiration Date:
            <input
              type='date'
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
            />
          </label>
          <label>Type:
            <input
              type='text'
              value={type}
              onChange={(e) => settype(e.target.value)}
              required
            />
          </label>
          <button type='submit'>Add Medicament</button>
        </form>
      </div>
    </Popup>
  );
};

export default AddMedicament;
