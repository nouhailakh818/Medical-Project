import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Facture.scss'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router';



const Facture = () => {
  const [factures, setFactures] = useState([]);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userRole, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/factures');
        setFactures(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des factures:', error);
        toast.error('Erreur lors du chargement des factures.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFactures();
  }, []);
 
  const handleValidate = async (facture) => {
    try {
      await axios.put(`http://localhost:3333/api/factures/${facture.id}/validate`);
      toast.success('Facture validée avec succès.');
      setFactures(factures.map(f => f.id === facture.id ? { ...f, status: 'validated' } : f));
      setSelectedFacture(facture);
    } catch (error) {
      console.error('Erreur lors de la validation de la facture:', error);
      toast.error('Erreur lors de la validation de la facture.');
    }
  };

  const handleDelete = async (facture) => {
    try {
      await axios.delete(`http://localhost:3333/api/factures/${facture.id}`);
      toast.success('Facture annulée avec succès.');
      setFactures(factures.filter(f => f.id !== facture.id)); 
    } catch (error) {
      console.error('Erreur lors de l\'annulation de la facture:', error);
      toast.error('Erreur lors de l\'annulation de la facture.');
    }
  };

  useEffect(() => {
    if (isAuthenticated && userRole !== 'ROLE_ADMIN') {
      navigate('/not-authorized');
    }
  }, [userRole, isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; 
  };

 
  return (
    <div className="facture-page">
      <h1>Invoices</h1>
      <table className="facture-table">
        <thead>
          <tr>
            <th>ID invoice</th>
            <th>ID Order</th>
            <th>ID User</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {factures.length > 0 ? (
            factures.map((facture) => (
              <tr key={facture.id}>
                <td>{facture.id}</td>
                <td>{facture.orderId}</td>
                <td>{facture.userId}</td>
                <td>{facture.status}</td>
                <td>
                  <button 
                    onClick={() => handleValidate(facture)}
                    disabled={facture.status === 'validated' || facture.status === 'canceled'}
                  >
                    Validate
                  </button>
                  <button 
                    onClick={() => handleDelete(facture)}
                    disabled={facture.status === 'canceled' || facture.status === 'validated'}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No invoice found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default Facture;
