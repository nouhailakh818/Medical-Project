// routes/cart.routes.js
const express = require('express');
const Cart = require('../models/cart.model');
const router = express.Router();

// Add medicament to cart
router.post('/add', async (req, res) => {
  const { userId, medicamentId, quantity } = req.body;
  try {
    const [cartItem, created] = await Cart.findOrCreate({
      where: { userId, medicamentId },
      defaults: { quantity },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding to cart' });
  }
});

// Get cart items
router.get('/user/:userId', async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.params.userId },
      include: 'Medicament', 
    });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
});

module.exports = router;
