import React from "react";

const ContactFormModal = ({ show, handleClose }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={handleClose}>
          &times;
        </span>
        <h2>Contact Us</h2>
        <form>
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
          <label>Phone</label>
          <input type="tel" placeholder="Enter your phone number" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;
