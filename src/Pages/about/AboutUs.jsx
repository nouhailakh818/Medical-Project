import React from 'react';
import './AboutUs.scss'; // Assurez-vous que votre fichier SCSS est correctement lié

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Section Héros */}
      <div className="hero-section">
        <h1>Laboratories:<br /> where medicines that transform health are born</h1>
      </div>

      {/* Section Cartes */}
      <div className="cards-section">
        <div className="card">
          <div className="icon">
            <i className="fas fa-stethoscope"></i> {/* Icône pour Notre Mission */}
          </div>
          <h2>Our Mission</h2>
          <p>
          We are committed to providing the highest quality laboratory services
     with uncompromising accuracy and reliability. Our mission is to contribute
     to public health by providing detailed analysis and rapid results.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fas fa-users"></i> {/* Icône pour Notre Équipe */}
          </div>
          <h2>Our Team</h2>
          <p>
          Our team is composed of highly qualified scientists and technicians,
passionate about innovation and scientific progress. We work tirelessly
to stay at the forefront of technology and offer cutting-edge services.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fas fa-history"></i> {/* Icône pour Notre Histoire */}
          </div>
          <h2>Our History</h2>
          <p>
          Founded in 2000, our laboratory has grown steadily through our
commitment to excellence and customer satisfaction. We have evolved to
become a leader in the field of laboratory services.
          </p>
        </div>
      </div>
      <footer className="about-us__footer">
        <p>&copy; {new Date().getFullYear()} Our Laboratory. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
