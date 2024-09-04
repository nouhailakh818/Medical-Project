import React, { useState } from "react";
import ContactFormModal from "../../components/contact/ ContactFormModal"; 
import "./ContaUs.scss";
const ContaUs = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="contact-page">
    
      <div className="hero-section-hero">

        <h1> Want to Know More? <br/> Reach out to us!</h1>
        <button className="btn contact-btn" onClick={handleShowModal}>
          Contact Us
        </button>
      </div>

      {/*components*/}
      <ContactFormModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default ContaUs;
