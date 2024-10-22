import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./Super.scss"
import {  useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext'


const API_URL = "http://localhost:3333";

const Super = () => {
  const { userRole, isAuthenticated } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL + '/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(API_URL + '/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

 
  const handleAssignRole = async () => {
    try {
      if (!selectedUserId || !selectedRoleId) {
        alert('Please select both a user and a role.');
        return;
      }
  
      await axios.post(`${API_URL}/users/${selectedUserId}/assign-role`, { roleId: selectedRoleId });
      alert('Role assigned successfully');
  

      const response = await axios.get(API_URL + '/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };
  
  const handleRemoveRole = async () => {
    try {
      if (!selectedUserId || !selectedRoleId) {
        alert('Please select both a user and a role.');
        return;
      }

      await axios.post(`${API_URL}/users/${selectedUserId}/remove-role`, { roleId: selectedRoleId });
      alert('Role removed successfully');

      const response = await axios.get(API_URL + '/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error removing role:', error);
    }
  };
useEffect(() => {
  if(isAuthenticated && userRole !== 'ROLE_MODERATOR'){
    navigate('/not-authorized');
  }
},[userRole, isAuthenticated, navigate]);
  return (
    <div className="super-container">
      <h2>Moderator Role Management</h2>

      <div className="role-section">
        <h3>Assign Role</h3>
        <div className="form-group">
          <label>Select User:</label>
          <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.email}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select Role:</label>
          <select onChange={(e) => setSelectedRoleId(e.target.value)} value={selectedRoleId}>
            <option value="">Select Role</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <button onClick={handleAssignRole}>Assign Role</button>
      </div>

      <div className="role-section">
        <h3>Remove Role</h3>
        <div className="form-group">
          <label>Select User:</label>
          <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.email}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select Role:</label>
          <select onChange={(e) => setSelectedRoleId(e.target.value)} value={selectedRoleId}>
            <option value="">Select Role</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <button onClick={handleRemoveRole}>Remove Role</button>
      </div>
    </div>
  );
};

export default Super;
