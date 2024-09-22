import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = ({ laboId }) => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to={`/${laboId}/medicaments`}>Medicaments</Link> 
          </li>
          <li>
            <Link to="/users">Laboratories </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
