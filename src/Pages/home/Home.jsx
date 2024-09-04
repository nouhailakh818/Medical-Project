import React from "react";
import headerImage from "../../images/doctor.jpg"; 
import "./Home.scss"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <header className="Header ">
      <div className="content">
        <h1>
          <span>Get Quick</span>
          <br />
          Medical Services
        </h1>
        <p>
        Bridging healthcare and technology, 
        Medical Pharmatique is at the forefront of delivering innovative solutions to enhance patient care and streamline pharmaceutical services.
        </p>
        <Link to="/about-us">
        <button className="btn">Learn About Us</button>
      </Link>
      </div>
      <div className="image">
        <span className="image__bg"></span>
        <img src={headerImage} alt="header image" />
        <div className="image__content image__content__1">
          <span>
            <i className="ri-user-3-line"></i>
          </span>
          <div className="details">
            <h4>1520+</h4>
            <p>Active Clients</p>
          </div>
        </div>
       
      </div>
    </header>
  );
};

export default Home;

