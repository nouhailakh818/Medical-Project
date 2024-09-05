import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import Sidebar from '../sidebarPanier/Sidebar';
import './Cart.scss';
import { useLocation, useParams } from 'react-router';

const Cart = () => {
  const { id: paramsId } = useParams(); // Récupérer l'ID des paramètres d'URL
  const location = useLocation(); 
  const { id: stateId } = location.state || {}; // Récupérer l'ID passé via navigate
  const id = paramsId || stateId; // Prioriser l'ID des params ou de l'état  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);


  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity >= 0) {
      updateQuantity(itemId, parseInt(quantity));
    }
  };

  return (
    <div className="cart-page">
       <div>
      <Sidebar laboId={id} />
     
    </div>
      <div className="cart-container">
        <h1>Panier</h1>
        <section className="cart-items">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>Prix: {item.price} DH</p>
                </div>
                <div className="item-quantity">
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="item-total">
                  <p>Total: {item.price * item.quantity} DH</p>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                  Supprimer
                </button>
              </div>
            ))
          ) : (
            <p>Votre panier est vide.</p>
          )}
        </section>
        <div className="cart-summary">
          <p>Total: {getTotalPrice()} DH</p>
          <button className="checkout-button">Passer à la caisse</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
