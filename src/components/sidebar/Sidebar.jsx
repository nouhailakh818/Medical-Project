import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import { FaList, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const SidebarComponent = ({ onOptionClick }) => {
  return (
   
      <Sidebar >
        <Menu iconShape="circle">
          <SubMenu label="Medicaments" icon={<FaList />}  >  
            <MenuItem icon={<FaPlus />} onClick={() => onOptionClick('add')}>Ajouter</MenuItem>
            <MenuItem icon={<FaEdit />} onClick={() => onOptionClick('modify')}>Modifier</MenuItem>
            <MenuItem icon={<FaTrash />} onClick={() => onOptionClick('delete')}>Supprimer</MenuItem>
            </SubMenu>
            <MenuItem icon={<FaList />} onClick={() => onOptionClick('list')}>Liste</MenuItem>

        </Menu>
      </Sidebar>
   
  );
};

export default SidebarComponent;
