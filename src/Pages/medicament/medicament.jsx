import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './medicament.scss';
import AddMedicament from './AddMedicament';
import UpdateMedicament from './UpdateMedicament';
import Sidebar from '../../components/sidebar/Sidebar';
import AuthContext from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify'; // Import toast

const Medicament = () => {
  const { userRole, isAuthenticated } = useContext(AuthContext);
  const [medicaments, setMedicaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedType, setExpandedType] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMedicament, setSelectedMedicament] = useState(null);
  const [action, setAction] = useState('list');
  const navigate = useNavigate();

  // Format date utility function
  const dateFormat = (date) => {
    const formattedDate = new Date(date);
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch medicaments data on component mount
  useEffect(() => {
    const fetchMedicaments = async () => {
      try {
        const response = await axios.get('http://localhost:3333/medicament');
        setMedicaments(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch medicaments');
        setLoading(false);
      }
    };
    fetchMedicaments();
  }, []);

  // Refresh medicaments after actions
  const refreshMedicaments = async () => {
    try {
      const response = await axios.get('http://localhost:3333/medicament');
      const sortedMedicaments = response.data.sort((a, b) => a.id - b.id); // Sorting by id in ascending order
      setMedicaments(sortedMedicaments);
    } catch (error) {
      toast.error('Error refreshing medicaments'); // Show toast
      console.error('Error refreshing medicaments:', error);
    }
  };

  // Group medicaments by type
  const groupedMedicaments = medicaments.reduce((acc, medicament) => {
    const { type } = medicament;
    if (!acc[type]) acc[type] = [];
    acc[type].push(medicament);
    return acc;
  }, {});

  // Filter medicaments based on search query
  const filteredMedicaments = Object.keys(groupedMedicaments).reduce((acc, type) => {
    const filtered = groupedMedicaments[type].filter(medicament =>
      medicament.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[type] = filtered;
    }
    return acc;
  }, {});

  // Toggle accordion for displaying medicaments by type
  const toggleAccordion = (type) => {
    setExpandedType(expandedType === type ? null : type);
  };

  // Handle add button click
  const handleAddButtonClick = () => {
    setSelectedMedicament(null); // Reset selected medicament for adding a new one
    setAction('add');
    setIsPopupOpen(true);
  };

  // Handle modify button click
  const handleModifyButtonClick = (medicament) => {
    setSelectedMedicament(medicament);
    setAction('modify');
    setIsPopupOpen(true);
  };

  // Handle delete action with confirmation and toast
  const handleDeleteButtonClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicament?')) {
      try {
        await axios.delete(`http://localhost:3333/medicament/${id}`);
        toast.success('Medicament deleted successfully'); // Show toast
        refreshMedicaments(); // Refresh the list after deletion
      } catch (error) {
        toast.error('Failed to delete medicament'); // Show toast
        console.error('Error deleting medicament:', error);
      }
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setAction('list');
  };

  const handleSidebarOptionClick = (option) => {
    setAction(option);
    if (option === 'add') {
      handleAddButtonClick();
    }
  };

  useEffect(() => {
    if (isAuthenticated && userRole !== 'ROLE_ADMIN') {
      navigate('/not-authorized');
    }
  }, [userRole, isAuthenticated, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='table'>
      <Sidebar onOptionClick={handleSidebarOptionClick} />
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
                        <th>Actions</th>
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
                          <td>
                            <button onClick={() => handleModifyButtonClick(medicament)}><FaPen color='red'/></button>
                            <button onClick={() => handleDeleteButtonClick(medicament.id)}><MdDelete color='green'/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}

        {isPopupOpen && action === 'add' && (
          <AddMedicament
            open={isPopupOpen}
            onClose={handleClosePopup}
            refreshMedicaments={refreshMedicaments}
          />
        )}
        {isPopupOpen && action === 'modify' && (
          <UpdateMedicament
            open={isPopupOpen}
            onClose={handleClosePopup}
            refreshMedicaments={refreshMedicaments}
            medicament={selectedMedicament}
          />
        )}
      </main>
    </div>
  );
};

export default Medicament;
