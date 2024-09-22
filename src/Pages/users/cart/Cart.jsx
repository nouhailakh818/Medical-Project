import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import AuthContext from '../../../components/context/AuthContext';
import Sidebar from '../sidebarCart/Sidebar';
import './Cart.scss';
import { useLocation, useParams, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios';

const Cart = () => {
  const { id: paramsId } = useParams();
  const location = useLocation();
  const { id: stateId } = location.state || {}; 
  const id = paramsId || stateId;
 const { userRole, isAuthenticated } = useContext(AuthContext);
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useContext(CartContext);
  const { userId } = useContext(AuthContext); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const handleQuantityChange = (itemId, quantity) => {
    if (quantity >= 0) {
      updateQuantity(itemId, parseInt(quantity));
    }
  };

  const handleCheckout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (!userId) {
        toast.error('Vous devez être connecté pour passer une commande.');
        console.log('User not authenticated, userId:', userId); 
        return;
      }

      const orderData = {
        cartItems: cart,
        totalPrice: getTotalPrice(),
        userId: userId,
      };

      const response = await axios.post('http://localhost:3333/api/orders', orderData);

      if (response.status === 201) {
        toast.success('Commande réussie !');
        clearCart(); 
      } else {
        toast.error('Échec de la commande.');
      }
    } catch (error) {
      console.error('Failed to create order:', error);
      toast.error('Échec de la commande.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect (() => {
    if(isAuthenticated && userRole !== 'ROLE_USER'){
      navigate('/not-authorized');
    }
  }, [userRole, isAuthenticated, navigate]);

  return (
    <div className="cart-page">
      <Sidebar laboId={id} />
      <div className="cart-container">
        <h1>Cart</h1>
        <section className="cart-items">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>Price: {item.price} DH</p>
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
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>Your Cart is empty</p>
          )}
        </section>
        <div className="cart-summary">
          <p>Total: {getTotalPrice()} DH</p>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Place an order'}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
