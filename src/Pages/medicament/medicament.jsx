import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './medicament.scss';
import AddMedicament from './AddMedicament';
import Sidebar from '../../components/sidebar/Sidebar';  // Importing the new Sidebar component

const Medicament = () => {
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedType, setExpandedType] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [action, setAction] = useState('list'); // State to track the current action

  function dateFormat(date) {
    const formatedDate = new Date(date);
    const day = String(formatedDate.getDate()).padStart(2, '0');
    const month = String(formatedDate.getMonth() + 1).padStart(2, '0');
    const year = formatedDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    async function fetchMedicaments() {
      try {
        const response = await axios.get('http://localhost:3333/medicament');
        setMedicaments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medicaments:', error);
        setError('Failed to fetch medicaments');
        setLoading(false);
      }
    }
    fetchMedicaments();
  }, []);

  const refreshMedicaments = async () => {
    try {
      const response = await axios.get('http://localhost:3333/medicament');
      setMedicaments(response.data);
    } catch (error) {
      console.error('Error refreshing medicaments:', error);
    }
  };

  const groupedMedicaments = medicaments.reduce((acc, medicament) => {
    const { type } = medicament;
    if (!acc[type]) acc[type] = [];
    acc[type].push(medicament);
    return acc;
  }, {});

  const filteredMedicaments = Object.keys(groupedMedicaments).reduce((acc, type) => {
    const filtered = groupedMedicaments[type].filter(medicament =>
      medicament.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[type] = filtered;
    }
    return acc;
  }, {});

  const toggleAccordion = (type) => {
    setExpandedType(expandedType === type ? null : type);
  };

  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSidebarOptionClick = (option) => {
    setAction(option);
    if (option === 'add') {
      setIsPopupOpen(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='table'>
      <Sidebar onOptionClick={handleSidebarOptionClick} /> {/* Use the new Sidebar */}
      <main className='content'>
        <h1>Medicaments</h1>
        <div className="search-container">
          <input
            type='text'
            placeholder='Search by name...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='search-bar'
          />
          {action === 'list' && (
            <button className='addbtn' onClick={handleAddButtonClick}>Add Medicament</button>
          )}
        </div>

        {/* Conditionally render based on the selected action */}
        {action === 'list' && (
          Object.keys(filteredMedicaments).map((type) => (
            <div key={type} className="accordion-item">
              <div className="accordion-header" onClick={() => toggleAccordion(type)}>
                <h2>{type}</h2>
                <span>{expandedType === type ? '-' : '+'}</span>
              </div>
              {expandedType === type && (
                <div className="accordion-content">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Expiration Date</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMedicaments[type].map((medicament) => (
                        <tr key={medicament.id}>
                          <td>{medicament.id}</td>
                          <td>{medicament.name}</td>
                          <td>{medicament.description}</td>
                          <td>{medicament.price}</td>
                          <td>{medicament.quantity}</td>
                          <td>{dateFormat(medicament.expiration_date)}</td>
                          <td>{dateFormat(medicament.created_at)}</td>
                          <td>{dateFormat(medicament.updated_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}
         <AddMedicament open={isPopupOpen} onClose={handleClosePopup} refreshMedicaments={refreshMedicaments} />
        {action === 'add' && (
          <AddMedicament open={isPopupOpen} onClose={handleClosePopup} refreshMedicaments={refreshMedicaments} />
        )}
        {/* You can add more conditions here for modify, delete, etc. */}
      </main>
    </div>
  );
};

export default Medicament;
