import React, { useState } from 'react';
import axios from 'axios';

const UploadLaboratoire = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    phone_number: '',
    email: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('/api/laboratoire', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Laboratoire created:', response.data);
    } catch (error) {
      console.error('Error creating laboratoire:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} />
      <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Upload Laboratoire</button>
    </form>
  );
};

export default UploadLaboratoire;
