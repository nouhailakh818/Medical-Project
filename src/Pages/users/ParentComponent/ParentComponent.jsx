/*import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const ParentComponent = () => {
  const [laboId, setLaboId] = useState();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch(`http://localhost:3333/${id}/medicaments`) 
      .then((response) => response.json())
      .then((data) => {
       
          setLaboId(data.id); 
          console.log('hdbchdb');
        
      })
      .catch((error) => console.error('Error fetching laboratory data:', error))
      .finally(() => setLoading(false)); 
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
    
  }

  if (!id) {
    return <div>Unable to retrieve laboratory information.</div>; 
  }

 
};

export default ParentComponent;
*/