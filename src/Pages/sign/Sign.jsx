import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { AiOutlineSwapRight } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import "./Sign.scss";
import Axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const notifySuccess = () => toast.success('Compte créé avec succès');
  const notifyError = (message) => toast.error(message);
  
  const navigate = useNavigate(); 

  const register = async (e) => {
    e.preventDefault();

    if (emailError || passwordError || !validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
      if (password !== confirmPassword) {
        notifyError("Les mots de passe ne correspondent pas.");
      }
      return;
    }

    try {
      const response = await Axios.post("http://localhost:3333/api/auth/signup", {
        nom: lastName,
        prenom: name,
        email: email,
        password,
      });

      if (response.status === 200) {
        notifySuccess(); // Afficher une notification de succès
        setTimeout(() => {
          navigate("/login"); // Rediriger après 2 secondes
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        notifyError(error.response.data.message); // Afficher le message d'erreur du backend
      } else {
        notifyError("Erreur lors de l'inscription.");
      }
    }
  };

  const validateName = (name) => /^[a-zA-Z]+$/.test(name);
  const validateEmail = (email) => {
    // Expression régulière pour vérifier l'email sans espaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Vérifier que l'email ne contient pas d'espaces
    return emailRegex.test(email) && !/\s/.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Adresse email invalide");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value) ? "" : "Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z]/g, '');
    setName(filteredValue);
    setNameError(validateName(filteredValue) ? "" : "Le nom doit contenir uniquement des lettres");
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    // Filtrer les caractères non alphabétiques
    const filteredValue = value.replace(/[^a-zA-Z]/g, '');
    setLastName(filteredValue);
    setLastNameError(validateName(filteredValue) ? "" : "Le prénom doit contenir uniquement des lettres");
  };

  return (
    <div className="SignPage flex">
      <div className="container flex">
        <div className="imageDiv">
          <div className="mediSideImage" alt=""></div>
        </div>
        <p>
          <h1 className="msgRegister">{registerStatus}</h1>
        </p>
        <div className="formDiv flex">
          <div className="headerDiv">
            <h3>Créer Votre Compte!</h3>
          </div>
          <form className="form grid1" onSubmit={register}>
            <div className="inputDiv">
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  placeholder="Entrer votre nom"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              {nameError && <span className="error">{nameError}</span>}
            </div>
            <div className="inputDiv">
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  placeholder="Entrer votre prénom"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </div>
              {lastNameError && <span className="error">{lastNameError}</span>}
            </div>
            <div className="inputDiv">
              <div className="input flex">
                <TfiEmail className="icon" />
                <input
                  type="email"
                  placeholder="Entrer votre email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              {emailError && <span className="error">{emailError}</span>}
            </div>
            <div className="inputDiv">
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  placeholder="Entrer votre mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              {passwordError && <span className="error">{passwordError}</span>}
            </div>
            <div className="inputDiv">
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  placeholder="Confirmer votre mot de passe"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
            </div>
            <button className="btn flex" type="submit">
              S'inscrire
              <AiOutlineSwapRight className="icon" />
            </button>
            <Toaster />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign;
