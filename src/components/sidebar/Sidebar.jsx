import React from 'react';
import { Link } from 'react-router-dom';
import { FaList } from 'react-icons/fa'; 
import { Sidebar, Menu} from 'react-pro-sidebar';
import './Sidebar.scss'
const SidebarComponent = ({ onOptionClick }) => {
  return (
    <Sidebar>
      <Menu iconShape="circle">
        <ul>
          <li>
       
              <FaList /> List
            
          </li>
          <li>
            <Link to="/facture">
              <FaList /> Invoices
            </Link>
          </li>
        </ul>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
