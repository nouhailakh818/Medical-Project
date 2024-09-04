import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Medicament from './Pages/medicament/medicament';
import Log from './Pages/login/Log';
import Sign from './Pages/sign/Sign';
import Home from './Pages/home/Home';
import Navbar from './components/navbar/Navbar';
import ContaUs from './Pages/contact/ContaUs';
import User from './Pages/users/User';
import AboutUs from './Pages/about/AboutUs';
import Super from './components/moderator/Super';
import MedicamentList from './Pages/users/medicament/MedicamentList';  // Adjust the path as necessary

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (medicament) => {
    setCart((prevCart) => [...prevCart, medicament]);
  };

  return (
    <div className='App'>
      <Router>
        <AppRoutes addToCart={addToCart} />
      </Router>
    </div>
  );
};

// This component handles conditional rendering of Navbar
const AppRoutes = ({ addToCart }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/sign';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className='container'>
        <Routes>
          <Route path="*" element={<ContaUs />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Log />} />
          <Route path="/medicament" element={<Medicament />} />
          <Route path="/contact" element={<ContaUs />} />
          <Route path="/users" element={<User />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/moderator" element={<Super />} />
          <Route path="/laboratoires/:Id/categories" element={<MedicamentList addToCart={addToCart} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
